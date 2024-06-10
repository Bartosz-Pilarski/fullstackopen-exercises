/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.getDiaryById(Number(req.params.id));
  if(diary) return res.status(200).json(diary);
  return res.status(404).json({ error: 'Diary not found' });
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);

    res.status(200).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Mayday: ";
    if(error instanceof Error) errorMessage += error.message;

    res.status(400).json(errorMessage);
  }
});

export default router;