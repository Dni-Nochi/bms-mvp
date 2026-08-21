import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SortOption = 'newest' | 'oldest' | 'salary' | 'match';

export interface VacancySearchState {
  skill: string;
  experienceLevels: string[];
  workFormats: string[];
  employmentTypes: string[];
  sort: SortOption;
  aiMode: boolean;
  resumeId: number | null;
  showLocalCurrency: boolean;
}

const initialState: VacancySearchState = {
  skill: '',
  experienceLevels: [],
  workFormats: [],
  employmentTypes: ['Полная'],
  sort: 'newest',
  aiMode: false,
  resumeId: null,
  showLocalCurrency: false,
};

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

const vacancySearchSlice = createSlice({
  name: 'vacancySearch',
  initialState,
  reducers: {
    setSkill(state, action: PayloadAction<string>) {
      state.skill = action.payload;
    },
    toggleExperienceLevel(state, action: PayloadAction<string>) {
      state.experienceLevels = toggleInArray(state.experienceLevels, action.payload);
    },
    toggleWorkFormat(state, action: PayloadAction<string>) {
      state.workFormats = toggleInArray(state.workFormats, action.payload);
    },
    toggleEmploymentType(state, action: PayloadAction<string>) {
      state.employmentTypes = toggleInArray(state.employmentTypes, action.payload);
    },
    setSort(state, action: PayloadAction<SortOption>) {
      state.sort = action.payload;
    },
    setResumeId(state, action: PayloadAction<number | null>) {
      state.resumeId = action.payload;
    },
    setAiMode(state, action: PayloadAction<boolean>) {
      state.aiMode = action.payload;
      state.sort = action.payload ? 'match' : 'newest';
    },
    clearFilters(state) {
      state.skill = '';
      state.experienceLevels = [];
      state.workFormats = [];
      state.employmentTypes = [];
    },
    toggleLocalCurrency(state) {
      state.showLocalCurrency = !state.showLocalCurrency;
    },
  },
});

export const {
  setSkill,
  toggleExperienceLevel,
  toggleWorkFormat,
  toggleEmploymentType,
  setSort,
  setResumeId,
  setAiMode,
  clearFilters,
  toggleLocalCurrency,
} = vacancySearchSlice.actions;

export default vacancySearchSlice.reducer;
