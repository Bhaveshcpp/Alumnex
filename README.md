# Alumnex

What it is: A structured placement intelligence platform that converts alumni interview knowledge into a searchable, governed institutional database.
The core bet: Placement knowledge shouldn't require networking. It should be infrastructure.
Stack: Node.js · Express.js · MongoDB · React · Redux Toolkit · Tailwind CSS · JWT · Render · Vercel
Key product decisions :
Idempotent CSV ingestion pipeline — TPO can re-upload without data corruption
Admin-only write access via JWT — data quality controlled at the gate, not after
Server-side pagination and filtering — scales to multi-batch, multi-department without re-architecture
Optional alumni identity disclosure — respects privacy while enabling warm outreach
Live Frontend: https://alumnex-c96d.vercel.app
API: https://alumnex-api.onrender.com
