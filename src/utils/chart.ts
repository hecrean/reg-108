import type { CaseStudy, StageADT, TreatmentEffectMetrics } from '$data/state';
import type { Color } from '$utils/color';

export type NoData = { tag: 'no-data'; msg: string };
export const nodata = (msg: string = 'no data') => ({ tag: 'no-data', msg });

export type Dataset = {
	datasetId: string;
	points: Array<{ x: number; y: number }>;
	variableNames: { x: string; y: string };
	units: { x: string; y: string };
	meta: { color: Color };
};

const stages: Array<StageADT> = ['baseline', 'week24', 'week52'];

export const metricsLens = (caseStudy: CaseStudy, stage: StageADT) =>
	caseStudy.stages[stage].metrics;

const mapStageKeyToNumber = (stage: StageADT) => {
	switch (stage) {
		case 'baseline':
			return 0;
		case 'week24':
			return 24;
		case 'week52':
			return 52;
	}
};
const mapMetricKeyToLabel = (metricKey: keyof TreatmentEffectMetrics): string => {
	switch (metricKey) {
		case 'CRT':
			return 'CRT';
		case 'DRSS':
			return 'DRS';
		case 'EDTRS':
			return 'EDTRS';
		case 'grading':
			return 'grading';
		case 'snellen_equivalent':
			return 'Snellen Equivalent';
	}
};

const mapMetricKeyToUnits = (metricKey: keyof TreatmentEffectMetrics): string => {
	switch (metricKey) {
		case 'CRT':
			return '';
		case 'DRSS':
			return '';
		case 'EDTRS':
			return '';
		case 'grading':
			return '';
		case 'snellen_equivalent':
			return '';
	}
};

const timeset = (
	caseStudy: CaseStudy,
	stages: Array<StageADT>,
	metricKey: keyof TreatmentEffectMetrics
) =>
	stages.map((stage) => ({
		x: mapStageKeyToNumber(stage),
		y: Number(metricsLens(caseStudy, stage)[metricKey])
	}));

export const datasetFn = (
	caseStudy: CaseStudy,
	stages: Array<StageADT>,
	metricKey: keyof TreatmentEffectMetrics
): Dataset => ({
	datasetId: caseStudy.id,
	points: timeset(caseStudy, stages, metricKey),
	variableNames: { x: 'time', y: mapMetricKeyToLabel(metricKey) },
	units: { x: 'weeks', y: mapMetricKeyToUnits(metricKey) },
	meta: { color: caseStudy.colorId }
});

export const largest = (xs: Array<number>) =>
	xs.reduce((prev, curr) => (curr > prev ? curr : prev), 0);
