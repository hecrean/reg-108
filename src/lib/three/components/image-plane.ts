import type { XFadeMaterial } from '$lib/three/materials/XFadeMaterial';
import { animate } from '$lib/three/transitions';
import { Mesh, PlaneBufferGeometry, Texture, TextureLoader, Vector2 } from 'three';

class ImagePlane extends Mesh<PlaneBufferGeometry, XFadeMaterial> {
	offset: Vector2;
	distanceZ: number;
	aspectRatio: number;

	updateDiffuseMapTexture: (diffuseMap: Texture) => void;
	updateAspectRatio: (aspectRatio: number) => void;
	crossfadeImage: (
		textureLoader: TextureLoader,
		url1: string,
		url2: string,
		displacmentTextureUrl: string,
		duration: number
	) => Promise<void>;

	constructor(material: XFadeMaterial, aspectRatio: number, offset: Vector2, distanceZ: number) {
		super(new PlaneBufferGeometry(1, 1 / aspectRatio), material);
		this.aspectRatio = aspectRatio;
		this.offset = offset;
		this.distanceZ = distanceZ;

		this.updateDiffuseMapTexture = (diffuseMap: Texture): void => {
			this.material.uDiffuseTexture1 = diffuseMap;
			this.material.needsUpdate = true;
		};
		this.updateAspectRatio = (aspectRatio: number): void => {
			this.aspectRatio = aspectRatio;
			this.geometry = new PlaneBufferGeometry(1, 1 / aspectRatio);
		};
		this.crossfadeImage = async (
			textureLoader: TextureLoader,
			url1: string,
			url2: string,
			displacmentTextureUrl: string,
			duration = 5000
		) => {
			const tex1 = textureLoader.load(url1);
			const tex2 = textureLoader.load(url2);
			const displacementTexture = textureLoader.load(displacmentTextureUrl);

			await animate({
				from: { disp: 0 },
				to: { disp: 0.3 },
				duration: duration,
				easeFn: 'easeInCubic',
				onTick: ({ disp }) => {
					this.material.uDispFactor = disp;
					this.material.needsUpdate = true;
				}
			}).then(
				() => {
					this.material.uDiffuseTexture1 = tex1;
					this.material.uDiffuseTexture2 = tex2;
					this.material.uDispMap = displacementTexture;
				},
				() => {}
			);

			await animate({
				from: { disp: 0.3 },
				to: { disp: 0 },
				duration: duration,
				easeFn: 'easeInOutQuad',
				onTick: ({ disp }) => {
					this.material.uDispFactor = disp;
					this.material.needsUpdate = true;
				}
			}).then(
				() => {},
				() => {}
			);
		};
	}
}

export { ImagePlane };
