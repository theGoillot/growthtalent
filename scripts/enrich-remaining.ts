import { Client } from "pg";

const DB_URL = process.argv[2];

function inferType(name: string): string {
  const n = name.toLowerCase();
  const corporates = ["samsung", "procter", "airbus", "ferragamo", "acqua di parma", "puig", "condé nast", "kate spade", "veronica beard", "moroccanoil", "peet", "tito", "milani", "ilia", "marc fisher", "four hands", "austin pbs", "gotham fc", "grupo geisha", "starwood", "col group", "barentz", "transcat", "courir", "balenciaga", "happy hospitality", "nicholas crown", "foley mansfield"];
  const agencies = ["agency", "studio", "creative people", "noun agency", "media a la carte", "pat digital", "gossip genie", "vml", "harvey nash", "aquent", "80twenty", "leap brands", "scale up search", "beloform", "jefferson"];
  
  if (corporates.some(k => n.includes(k))) return "corporate";
  if (agencies.some(k => n.includes(k))) return "agency";
  if (n.includes("ventures") || n.includes("capital")) return "corporate";
  return "early-stage";
}

async function main() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  
  const res = await client.query(`
    SELECT id, name, domain FROM "Company" 
    WHERE about IS NULL 
    AND EXISTS (SELECT 1 FROM "Job" j WHERE j."companyId" = "Company".id AND j.status = 'APPROVED')
    ORDER BY name
  `);
  
  console.log(`${res.rows.length} companies to enrich`);
  
  for (const row of res.rows) {
    const type = inferType(row.name);
    const about = `${row.name} is actively hiring growth professionals on Growth.Talent. Browse their open positions and learn about their team.`;
    
    await client.query(`
      UPDATE "Company" SET about = $1, "companyType" = $2, "updatedAt" = NOW()
      WHERE id = $3 AND about IS NULL
    `, [about, type, row.id]);
    
    console.log(`  ${row.name}: ${type}`);
  }
  
  console.log(`Done: ${res.rows.length} companies updated`);
  await client.end();
}

main().catch(console.error);
