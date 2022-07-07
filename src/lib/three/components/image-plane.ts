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
		src1: string,
		src2: string,
		displacmentTexSrc: string,
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
			src1: string,
			src2: string,
			displacmentTexSrc: string,
			duration = 5000
		) => {
			const texture1 = textureLoader.load(src1);
			const texture2 = textureLoader.load(src2);
			const displacementTexture = textureLoader.load(displacmentTexSrc);

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
					this.material.uDiffuseTexture1 = texture1;
					this.material.uDiffuseTexture2 = texture2;
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
