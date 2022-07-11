import type { TransitionFnId } from '$lib/three/transitions';
import { Colors, type Color } from '$utils/color';

type NonEmptyArray<T> = [T, ...T[]];
type CaseStudyId = string;
type StageADT = 'baseline' | 'week24' | 'week52';
type ViewADT = 'fundus' | 'oct' | 'fa';
type Hotspot = { label: string; position: [number, number] };

export enum Grading {
	Baseline,
	Mild,
	Moderate,
	Severe,
	VerySevere
}

export type TreatmentEffectMetrics = {
	NPDR_grading: Grading;
	DRSS: number;
	CRT: number;
	EDTRS: number;
	snellen_equivalent: number;
};

type AnnotatedImage = {
	label: string;
	hotspots: Array<Hotspot>;
	aspect_ratio: number;
	url: string;
};
type BaselineCharacteristics = {
	gender: string;
	study_eye: string;
	duration_of_diabetes: number;
	HbA: number;
	age: number;
};
type ClinicalHistory = {
	occular_history: string;
	medical_history: string;
	concommitant_medications: string;
};

type Views = Record<ViewADT, NonEmptyArray<AnnotatedImage>>;
type Stages = Record<StageADT, { views: Views; metrics: TreatmentEffectMetrics }>;
type Transition = {
	temporal: {
		from: { [key in StageADT]: Array<TransitionFnId> };
		to: { [key in StageADT]: Array<TransitionFnId> };
	};
	positional: {
		from: { [key in ViewADT]: Array<TransitionFnId> };
		to: { [key in ViewADT]: Array<TransitionFnId> };
	};
};
export type CaseStudy = {
	id: CaseStudyId;
	colorId: Color;
	profile_picture: string;
	baseline_characteristics: BaselineCharacteristics;
	clinical_history: ClinicalHistory;
	stages: Stages;
	transitions: Transition;
};

const caseStudies: Array<CaseStudy> = [
	{
		id: '1',
		colorId: Colors.eyleablue,
		profile_picture:
			'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
		baseline_characteristics: {
			gender: 'male',
			study_eye: 'Right (OD)',
			duration_of_diabetes: 0.49,
			HbA: 5.9,
			age: 48
		},
		clinical_history: {
			occular_history: 'Both eyes: cataract. Study eye: DR',
			medical_history:
				'Alcoholism, hypertriglyceridemia, lower gastrointestinal hemorrhage, peripheral neuropathy, type 2 diabetes mellitus, vasectomy',
			concommitant_medications:
				'gabapentin, glipizide, ibuprofen, iron supplements, lidocaine, metformin, phenylephrine, povidone-iodine, proxymetacaine, tropicamide'
		},
		transitions: {
			temporal: {
				from: {
					baseline: ['DISPLACE_OUT'],
					week24: ['DISPLACE_OUT'],
					week52: ['DISPLACE_OUT']
				},
				to: {
					baseline: ['DISPLACE_IN'],
					week24: ['DISPLACE_IN'],
					week52: ['DISPLACE_IN']
				}
			},
			positional: {
				from: {
					fundus: [],
					oct: [],
					fa: []
				},
				to: {
					fundus: [],
					oct: [],
					fa: []
				}
			}
		},
		stages: {
			baseline: {
				metrics: {
					NPDR_grading: Grading.Severe,
					DRSS: 53,
					CRT: 265,
					EDTRS: 80,
					snellen_equivalent: 20 / 25
				},
				views: {
					fundus: [
						{
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],
							label:
								'Given the severity of the NPDR, it is likely that this patient has had type 2 diabetes mellitus much longer than 6 months. There are numerous intraretinal hemorrhages and microaneurysms, particularly in the temporal macula',
							aspect_ratio: 1920 / 1080,
							url: '/case-studies/1/FUNDUS/REG108_Fundus_Fundus_Angiogram_NoLeackage_Ca_0000.jpg'
						}
					],
					fa: [
						{
							label:
								'Given the severity of the NPDR, it is likely that this patient has had type 2 diabetes mellitus much longer than 6 months. There are numerous intraretinal hemorrhages and microaneurysms, particularly in the temporal macula',
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],
							aspect_ratio: 1920 / 1080,
							url: '/Eye/REG108_Eye_Aa.jpg'
						}
					],
					oct: [
						{
							label:
								'The OCT image gives the suggestion of mild intraretinal cysts, although the central subfield thickness (CST) is still normal relative to age-matched controls',
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],
							aspect_ratio: 1920 / 1080,
							url: '/case-studies/1/OCT/REG108_Retina_OCT_SmallestGap_Aa_0000.jpg'
						}
					]
				}
			},
			week24: {
				metrics: {
					NPDR_grading: Grading.Mild,
					DRSS: 35,
					CRT: 223,
					EDTRS: 85,
					snellen_equivalent: 20 / 20
				},
				views: {
					fundus: [
						{
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],

							label:
								'3 step improvement. Significant reduction in the number of microaneurysms and their associated leakage.',
							aspect_ratio: 1920 / 1080,
							url: '/case-studies/1/FUNDUS/REG108_Fundus_Fundus_Angiogram_LessDots_Ca_0000.jpg'
						}
					],

					fa: [
						{
							label:
								'3 step improvement. Significant reduction in the number of microaneurysms and their associated leakage.',
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],

							aspect_ratio: 1280 / 720,
							url: '/Aflibercept+VEGF/REG108_Aflibercept+VEGF_Aa.jpg'
						}
					],
					oct: [
						{
							label:
								'3 step improvement. Improvement in visual acuity and reduction in CST, suggesting the presence of subclinical DME at initial evaluation.',
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],
							aspect_ratio: 1280 / 720,
							url: '/case-studies/1/OCT/REG108_Retina_OCT_mediumGap_Aa_0000.jpg'
						}
					]
				}
			},
			week52: {
				metrics: {
					NPDR_grading: Grading.Mild,
					DRSS: 35,
					CRT: 202,
					EDTRS: 83,
					snellen_equivalent: 20 / 25
				},
				views: {
					fundus: [
						{
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],
							label:
								'3 step improvement. The reduction of microaneurysms seen at Week 24 persists. Of note, the patient has developed hard exudate in the superior macula without associated macular edema. That finding, combined with further reduction in CST, supports the idea of treatment of subclinical DME in conjunction with NPDR.',
							aspect_ratio: 1920 / 1080,
							url: '/case-studies/1/FUNDUS/REG108_Fundus_Fundus_Angiogram_Ea_0000.jpg'
						}
					],

					fa: [
						{
							label:
								'3 step improvement. The reduction of microaneurysms seen at Week 24 persists. Of note, the patient has developed hard exudate in the superior macula without associated macular edema. That finding, combined with further reduction in CST, supports the idea of treatment of subclinical DME in conjunction with NPDR.',
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],
							aspect_ratio: 1280 / 720,
							url: '/Aflibercept+VEGF/REG108_Aflibercept+VEGF_Ba_0000.jpg'
						}
					],
					oct: [
						{
							label:
								'3 step improvement. The reduction of microaneurysms seen at Week 24 persists. Of note, the patient has developed hard exudate in the superior macula without associated macular edema. That finding, combined with further reduction in CST, supports the idea of treatment of subclinical DME in conjunction with NPDR.',
							hotspots: [
								{ label: 'label', position: [0.2, 0.2] },
								{ label: 'label', position: [-0.2, 0.1] }
							],
							aspect_ratio: 1280 / 720,
							url: '/case-studies/1/OCT/REG108_Retina_OCT_LargeGap_Bb_0000.jpg'
						}
					]
				}
			}
		}
	}
];

export type {
	AnnotatedImage,
	CaseStudy,
	Views,
	Stages,
	Hotspot,
	StageADT,
	ViewADT,
	ClinicalHistory,
	BaselineCharacteristics
};
export { caseStudies };
