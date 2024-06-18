import { FC } from 'react';

//Props to pass down to specific components

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

export interface ConsumedItemEntryProps {
  itemEntry: {
    name: string;
    select: string;
    health_impact: string;
  };
  isEditing: boolean;
}

//Types to use in all files that need them

export interface EntryToDataBase {
  name: string;
  select: string;
  other_symptoms: string;
  stool_type: string;
  is_bleeding: boolean;
  userId: number | null;
}

export interface EntryFromDataBase {
  id: number;
  createdAt: string;
  name: string;
  select: string;
  health_impact: string;
  stool_type: string;
  is_bleeding: boolean;
  other_symptoms: string;
  userId: number;
  itemId: number;
}

export type EntryWithEdit = EntryFromDataBase & {
  isEditing: boolean;
};

export interface ItemEntryEdit {
  name: string;
  select: string;
  health_impact: string;
}
