"""Семантическая близость текста через мультиязычные sentence-эмбеддинги.

Раньше здесь был TF-IDF (пересечение слов) — он проваливался, когда
резюме и вакансия написаны на разных языках (например, резюме на
русском, а вакансия на английском), хотя по смыслу могли отлично
совпадать. Модель эмбеддингов обучена так, что предложения с похожим
смыслом получают близкие вектора независимо от языка.

Модель ("paraphrase-multilingual-MiniLM-L12-v2") загружается один раз
при первом обращении и держится в памяти процесса.
"""

import numpy as np

_model = None

MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"


def _get_model():
    global _model
    if _model is None:
        from sentence_transformers import SentenceTransformer

        _model = SentenceTransformer(MODEL_NAME)
    return _model


def encode(texts: list[str]) -> np.ndarray:
    model = _get_model()
    return model.encode(texts, normalize_embeddings=True, show_progress_bar=False)


def cosine_similarity_matrix(query: np.ndarray, corpus: np.ndarray) -> np.ndarray:
    # Векторы уже нормализованы (normalize_embeddings=True), поэтому
    # косинусное сходство — это просто скалярное произведение.
    return corpus @ query
