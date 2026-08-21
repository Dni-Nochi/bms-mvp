FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Модель эмбеддингов качается один раз на этапе сборки и остаётся в
# слое образа — иначе первый же запрос подбора вакансий тормозил бы
# на загрузку ~470МБ с HuggingFace.
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')"

COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]