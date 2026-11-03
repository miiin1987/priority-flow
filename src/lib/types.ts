export type Task = {
  id: string;
  name: string;
  urgent: boolean;
  important: boolean;
};

export type QuadrantKey =
  | "UrgentImportant"
  | "NotUrgentImportant"
  | "UrgentNotImportant"
  | "NotUrgentNotImportant";

export type QuadrantConfig = {
  key: QuadrantKey;
  label: string;
  description: string;
  guideline: string;
  urgent: boolean;
  important: boolean;
};

export const QUADRANTS: QuadrantConfig[] = [
  {
    key: "UrgentImportant",
    label: "重要・緊急",
    description: "第1象限",
    guideline: "今すぐ取りかかる",
    urgent: true,
    important: true,
  },
  {
    key: "NotUrgentImportant",
    label: "重要・非緊急",
    description: "第2象限",
    guideline: "計画して実行する",
    urgent: false,
    important: true,
  },
  {
    key: "UrgentNotImportant",
    label: "非重要・緊急",
    description: "第3象限",
    guideline: "委任を検討する",
    urgent: true,
    important: false,
  },
  {
    key: "NotUrgentNotImportant",
    label: "非重要・非緊急",
    description: "第4象限",
    guideline: "後回しまたは手放す",
    urgent: false,
    important: false,
  },
];
