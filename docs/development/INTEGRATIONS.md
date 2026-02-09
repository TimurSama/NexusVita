# Интеграции FHIR/HL7

## FHIR ingest
**POST** `/api/integrations/fhir/ingest`

```json
{
  "userId": "uuid",
  "bundle": { "resourceType": "Bundle", "type": "collection", "entry": [] }
}
```

## HL7 ingest
**POST** `/api/integrations/hl7/ingest`

```json
{
  "userId": "uuid",
  "message": "MSH|^~\\&|..."
}
```

## Просмотр импортов
**GET** `/api/integrations/ingestions?userId=uuid`

Возвращает список ingestions для пользователя.

## FHIR connect
**POST** `/api/integrations/fhir/connect`

```json
{
  "userId": "uuid",
  "baseUrl": "https://fhir.example.com",
  "accessToken": "token",
  "patientId": "optional"
}
```

## FHIR sync (patient + observation)
**POST** `/api/integrations/fhir/sync`

```json
{
  "userId": "uuid"
}
```

## Oura sync
**POST** `/api/integrations/oura/sync`

```json
{
  "userId": "uuid",
  "startDate": "2025-01-01",
  "endDate": "2025-01-07"
}
```

## Garmin sync
**POST** `/api/integrations/garmin/sync`

```json
{
  "userId": "uuid",
  "startDate": "2025-01-01",
  "endDate": "2025-01-07"
}
```
