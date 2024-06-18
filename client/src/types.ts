export interface EntryProps {
  name: string;
  select: string;
  createdAt: string;
  id: number;
  isEditing: boolean;
  health_impact: string;
  stool_type: string;
  is_bleeding: string;
  other_symptoms: string;
}

export interface SymptomsEntryProps {
  stool_type: string;
  is_bleeding: string;
  other_symptoms: string;
}
