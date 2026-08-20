from fastapi import FastAPI

app = FastAPI(
    title="BMS API",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "BMS API is running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }