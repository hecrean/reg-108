import { DisplacementMap } from '$data/displacement-maps';
import type { Hotspot } from '$data/state';
import { clamp } from '$utils/math';
import {
	AmbientLight,
	Color,
	Fog,
	Group,
	LoadingManager,
	PerspectiveCamera,
	Scene,
	Texture,
	TextureLoader,
	Vector2,
	Vector3,
	WebGLRenderer
} from 'three';
import {
	AfterimagePass,
	CopyShader,
	CSS2DObject,
	CSS2DRenderer,
	EffectComposer,
	FilmPass,
	GlitchPass,
	MaskPass,
	RenderPass,
	ShaderPass,
	UnrealBloomPass
} from 'three-stdlib';
import { Html } from './components/three-html/Html';
import { ImagePlane } from './components/image-plane';
import { cssLabel } from './templates/btn';
import { XFadeMaterial } from './materials/XFadeMaterial';
import type { TransitionFnId } from './transitions';
import { transitions } from './transitions';

type Object3dHandles = {
	ambientLight: AmbientLight;
	plane: ImagePlane;
};
type ResourceHandles = {
	rtTexture: Texture;
};

type PostprocessingPassHandles = {
	renderPass: RenderPass;
	effectCopy: ShaderPass;
	filmPass: FilmPass;
	afterImagePass: AfterimagePass;
	unrealBloomPass: UnrealBloomPass;
	maskPass: MaskPass;
	glitchPass: GlitchPass;
};

export type ThreeState = {
	object3dHandles: Object3dHandles;
	resourceHandles: ResourceHandles;
	passes: PostprocessingPassHandles;
	cssRenderer: CSS2DRenderer;
	renderer: WebGLRenderer;
	composer: EffectComposer;
	camera: PerspectiveCamera;
	scene: Scene;
	cssScene: Scene;
	mouse: Vector2;
	resolution: Vector2;
	assetManager: LoadingManager;
	textureLoader: TextureLoader;
	canvasProxyEl: HTMLDivElement;
};

const createThree = (
	canvasProxyEl: HTMLDivElement,
	canvasEl: HTMLCanvasElement,
	cssEl: HTMLDivElement
) => {
	// scenes :
	const scene = new Scene();
	scene.fog = new Fog(0x000000, 1, 1000);
	const cssScene = new Scene();

	//render targets, planes,
	const canvasWidth = canvasEl.clientWidth;
	const canvasHeight = canvasEl.clientHeight;
	const aspect = canvasWidth / canvasHeight;
	const resolution = new Vector2(canvasWidth, canvasHeight);
	const mouse = new Vector2();

	const rtTexture = new Texture();

	const fov = 50;
	const near = 0.1;
	const far = 50;
	const camera = new PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 4;

	const renderer = new WebGLRenderer({
		antialias: true,
		canvas: canvasEl
	});

	const dpr = window?.devicePixelRatio || 1;
	renderer.setPixelRatio(dpr);

	const cssRenderer = new CSS2DRenderer({ element: cssEl });

	// asset manager
	const assetManager = new LoadingManager(
		() => {
			console.log(`Loading complete!`);
		},
		(url: string, loaded: number, total: number) => console.log(`Items loaded: ${loaded}/${total}`),
		(url: string) => {
			console.log(`There was an error loading ` + url);
		}
	);
	const textureLoader = new TextureLoader(assetManager);

	const ambientLight = new AmbientLight(new Color('white'), 1);

	const plane = new ImagePlane(
		new XFadeMaterial({
			uMouse: mouse,
			uResolution: resolution,
			uDiffuseTexture1: textureLoader.load(Texture.DEFAULT_IMAGE),
			uDiffuseTexture2: textureLoader.load(Texture.DEFAULT_IMAGE),
			uDispMap: textureLoader.load(DisplacementMap.COSMOLOGICAL)
		}),
		1 / 1,
		new Vector2(0, 0),
		0
	);

	// cssGroup.clear();
	// cssScene.add(new Html(new CssFlashingTooltip(1, 'label', () => {}), plane));

	scene.add(ambientLight, plane);

	const renderPass = new RenderPass(scene, camera);
	const effectCopy = new ShaderPass(CopyShader);
	effectCopy.renderToScreen = true;

	const afterImagePass = new AfterimagePass();
	const unrealBloomPass = new UnrealBloomPass(resolution, 1, 1, 1);
	const maskPass = new MaskPass(scene, camera);
	const filmPass = new FilmPass(1, 1, 1, false);
	const glitchPass = new GlitchPass();

	const composer = new EffectComposer(renderer);
	composer.addPass(renderPass);
	composer.addPass(effectCopy);

	const state: ThreeState = {
		object3dHandles: {
			ambientLight,
			plane
		},
		resourceHandles: {
			rtTexture
		},
		passes: {
			renderPass,
			effectCopy,
			filmPass,
			glitchPass,
			afterImagePass,
			unrealBloomPass,
			maskPass
		},
		renderer: renderer,
		cssRenderer: cssRenderer,
		cssScene: cssScene,
		composer: composer,
		camera: camera,
		scene: scene,

		mouse: mouse,
		resolution: resolution,
		assetManager: assetManager,
		textureLoader: textureLoader,
		canvasProxyEl: canvasProxyEl
	};

	return {
		state: () => state,
		pan: ({ camera, object3dHandles: { plane } }: ThreeState, dx: number, dy: number) => {
			const dragCoefficient = 0.1;

			const fovy = (camera.fov * Math.PI) / 180;
			const X = 2 * camera.aspect * camera.position.z * Math.tan(fovy / 2);
			const Y = 2 * camera.position.z * Math.tan(fovy / 2);

			const { width, height } = plane.geometry.parameters;
			const position = camera.position;

			const _x = clamp(position.x + dx, -width / 2 + X / 2, width / 2 - X / 2);
			const _y = clamp(position.y + dy, -height / 2 + Y / 2, height / 2 - Y / 2);

			camera.position.set(_x, _y, position.z);
			return state;
		},
		dolly: ({ camera, object3dHandles: { plane } }: ThreeState, dz: number) => {
			const fovy = (camera.fov * Math.PI) / 180;

			const { width: planeWidth, height: planeHeight } = plane.geometry.parameters;

			const zMax = Math.min(
				planeWidth / (2 * camera.aspect * Math.tan(fovy / 2)),
				planeHeight / (2 * Math.tan(fovy / 2))
			);
			const z = clamp(camera.position.z + dz, 0.1, zMax);

			const proposedViewsquareWidth = 2 * camera.aspect * z * Math.tan(fovy / 2);
			const proposedViewsquareHeight = 2 * z * Math.tan(fovy / 2);

			//left
			const leftBound = -planeWidth / 2 + proposedViewsquareWidth / 2;
			if (camera.position.x < leftBound) {
				camera.position.setX(leftBound);
			}
			//right
			const rightBound = planeWidth / 2 - proposedViewsquareWidth / 2;
			if (camera.position.x > rightBound) {
				camera.position.setX(rightBound);
			}
			//bottom
			const bottomBound = -planeHeight / 2 + proposedViewsquareHeight / 2;
			if (camera.position.y < bottomBound) {
				camera.position.setY(bottomBound);
			}
			//top
			const topBound = planeHeight / 2 - proposedViewsquareHeight / 2;
			if (camera.position.y > topBound) {
				camera.position.setY(topBound);
			}

			state.camera.position.setZ(z);

			return state;
		},
		render: ({
			renderer,
			canvasProxyEl,
			camera,
			composer,
			scene,
			cssRenderer,
			object3dHandles: { plane }
		}: ThreeState) => {
			const canvas = state.renderer.domElement;

			const needResize =
				Math.round(state.canvasProxyEl.clientHeight) !== Math.round(canvas.height) ||
				Math.round(state.canvasProxyEl.clientWidth) !== Math.round(canvas.width);

			if (needResize) {
				const aspect = canvasProxyEl.clientWidth / canvasProxyEl.clientHeight;
				camera.aspect = aspect;
				renderer.setSize(canvasProxyEl.clientWidth, canvasProxyEl.clientHeight);
				cssRenderer.setSize(canvasProxyEl.clientWidth, canvasProxyEl.clientHeight);
				composer.setSize(canvasProxyEl.clientWidth, canvasProxyEl.clientHeight);
				camera.updateProjectionMatrix();
			}

			plane.material.uMouse = mouse;
			plane.material.uResolution = resolution;

			composer.render();
			cssRenderer.render(scene, camera);

			return state;
		},
		resize: ({ camera, renderer, composer }: ThreeState, w: number, h: number) => {
			const aspect = w / h;
			camera.aspect = aspect;
			renderer.setSize(w, h, false);
			composer.setSize(w, h);
			camera.updateProjectionMatrix();
			return state;
		},
		changePlaneTexture: async (
			{ object3dHandles: { plane }, textureLoader }: ThreeState,
			url1: string,
			url2: string,
			displacmentTextureUrl: string,
			aspectRatio: number,
			temporalTransition: Array<TransitionFnId>,
			positionalTransition: Array<TransitionFnId>
		) => {
			plane.updateAspectRatio(aspectRatio);
			await plane.crossfadeImage(textureLoader, url1, url2, displacmentTextureUrl, 500);
			// for (const timeTransId of temporalTransition) {
			// 	transitions[timeTransId](state, url);
			// }
			// for (const posTransId of positionalTransition) {
			// 	transitions[posTransId](state, url);
			// }

			return state;
		},
		fitPlaneToViewport: ({ object3dHandles: { plane }, camera }: ThreeState) => {
			const planeSize = plane.geometry.parameters;

			const vFov = (camera.fov * Math.PI) / 180;

			const cameraZForFittingPlaneHeightInFrame = planeSize.height / (2 * Math.tan(0.5 * vFov));
			const cameraZForFittingPlaneWidthInFrame =
				planeSize.width / (2 * camera.aspect * Math.tan(0.5 * vFov));

			const z = Math.min(
				Math.min(cameraZForFittingPlaneHeightInFrame, cameraZForFittingPlaneWidthInFrame),
				camera.position.z
			);

			camera.position.set(0, 0, z);

			camera.updateProjectionMatrix();

			return state;
		},
		changeHotspots: (
			{ cssScene, object3dHandles: { plane } }: ThreeState,
			newHotspots: Array<Hotspot>
		) => {
			cssScene.clear();
			cssScene.add(
				...newHotspots.map(
					(hs, id) =>
						new Html(
							// new CssLabelButton(id, hs.label, (ev: MouseEvent) => {}),
							cssLabel(hs.label, 'more detail to the label'),
							plane,
							new Vector3(hs.position[0], hs.position[1], 0)
						)
				)
			);
		}
	};
};

export type ThreeApi = ReturnType<typeof createThree>;

export const three = (
	canvasProxyEl: HTMLDivElement,
	canvasEl: HTMLCanvasElement,
	cssEl: HTMLDivElement
) => createThree(canvasProxyEl, canvasEl, cssEl);
