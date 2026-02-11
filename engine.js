// === 12 Code Scenarios - Multiple Languages ===
const S=[
{file:"neural_core.rs",path:"src > engine > neural",lang:"Rust",icon:"#DEA584",
content:`use std::sync::Arc;
use tokio::sync::Mutex;

pub struct NeuralCortex {
    synapses: Arc<Mutex<Vec<Synapse>>>,
    entropy_threshold: f64,
}

impl NeuralCortex {
    pub async fn initialize(config: Config) -> Result<Self, CoreError> {
        log::info!("Bootstrapping Neural Cortex v9.2...");
        let capacity = config.max_neurons * 1024;
        let mut synapses = Vec::with_capacity(capacity);
        for i in 0..config.num_sectors {
            synapses.push(Synapse::new_random(config.seed + i));
            if i % 10 == 0 {
                log::debug!("Sector {} initialized", i);
            }
        }
        Ok(Self {
            synapses: Arc::new(Mutex::new(synapses)),
            entropy_threshold: config.threshold,
        })
    }

    pub async fn process_signal(&self, input: &Signal) -> Vec<f64> {
        let locked = self.synapses.lock().await;
        locked.iter()
            .filter(|s| s.strength > self.entropy_threshold)
            .map(|s| s.activate(input))
            .collect()
    }
}`,
logs:["Compiling neural-core v0.9.2...","   Compiling tokio v1.32.0","   Compiling serde v1.0.188","warning: field 'entropy_threshold' is never read","Finished dev [unoptimized + debuginfo] in 3.42s","[INFO] Bootstrapping Neural Cortex v9.2...","[DEBUG] Sector 0 initialized","[DEBUG] All 100 sectors online"],
chat:["Analyzing dependencies for security vulnerabilities...","No critical vulnerabilities found in tokio or serde.","Suggestion: entropy_threshold could use a configurable default.","Refactoring: Consider using Box<[Synapse]> for immutable collections."],
sug:["Arc::new","Mutex::new","Vec::with_capacity","log::info!"]},

{file:"ResponseGenerator.ts",path:"src > services > llm",lang:"TypeScript",icon:"#3178C6",
content:`import { OpenAI } from 'openai';
import { StreamConfig, TokenUsage } from '../types';

export class ResponseGenerator {
  private client: OpenAI;
  private tokenTracker: TokenUsage;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
    this.tokenTracker = new TokenUsage();
  }

  async *generateStream(prompt: string, config: StreamConfig) {
    const stream = await this.client.chat.completions.create({
      model: config.model || 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
      temperature: config.temperature ?? 0.7,
    });
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        this.tokenTracker.add(content.length);
        yield content;
      }
    }
  }

  async getUsage(): Promise<TokenUsage> {
    return this.tokenTracker.snapshot();
  }
}`,
logs:["[ts-node] Compiling ResponseGenerator.ts...","Checked 42 files in 1.2s","[ESLint] 2 warnings found","PASS ResponseGenerator.test.ts (2.4s)","  ✓ should handle stream backpressure","  ✓ should track token usage correctly","Test Suites: 1 passed, 1 total"],
chat:["Scanning generateStream for memory leaks...","Analysis: Generator properly yields chunks with tracking.","Optimization: Converted for-await to pipeline pattern.","Generating JSDoc for StreamConfig..."],
sug:["console.log","await this.client","Promise.all","chunk.choices"]},

{file:"data_pipeline.py",path:"src > pipeline > etl",lang:"Python",icon:"#3572A5",
content:`import pandas as pd
from sqlalchemy import create_engine
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class DataPipeline:
    def __init__(self, connection_string: str):
        self.engine = create_engine(connection_string)
        self.batch_size = 10000

    def extract(self, query: str) -> pd.DataFrame:
        logger.info(f"Executing query: {query[:50]}...")
        return pd.read_sql(query, self.engine)

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df = df.dropna(subset=['user_id', 'timestamp'])
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df['hour'] = df['timestamp'].dt.hour
        df['is_active'] = df['session_duration'] > 30
        logger.info(f"Transformed {len(df)} rows")
        return df

    def load(self, df: pd.DataFrame, table: str):
        for i in range(0, len(df), self.batch_size):
            batch = df.iloc[i:i + self.batch_size]
            batch.to_sql(table, self.engine, if_exists='append')
            logger.info(f"Loaded batch {i // self.batch_size + 1}")`,
logs:["[Pipeline] Starting ETL process...","[Pipeline] Connected to PostgreSQL","[Pipeline] Extracted 45,230 rows","[Pipeline] Transforming data...","[Pipeline] Loaded batch 1 (10000 rows)","[Pipeline] Loaded batch 2 (10000 rows)","[Pipeline] ETL complete in 12.4s"],
chat:["Analyzing SQL injection risks in extract()...","Recommendation: Use parameterized queries instead of raw SQL strings.","Performance: Consider chunked reading with chunksize parameter.","Data quality: Add validation step between transform and load."],
sug:["pd.DataFrame","create_engine","logger.info","pd.to_datetime"]},

{file:"auth_middleware.go",path:"src > middleware",lang:"Go",icon:"#00ADD8",
content:`package middleware

import (
    "context"
    "net/http"
    "strings"
    "time"

    "github.com/golang-jwt/jwt/v5"
)

type AuthMiddleware struct {
    secretKey []byte
    skipPaths []string
}

func NewAuthMiddleware(secret string) *AuthMiddleware {
    return &AuthMiddleware{
        secretKey: []byte(secret),
        skipPaths: []string{"/health", "/login", "/register"},
    }
}

func (am *AuthMiddleware) Handler(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        for _, path := range am.skipPaths {
            if strings.HasPrefix(r.URL.Path, path) {
                next.ServeHTTP(w, r)
                return
            }
        }
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "unauthorized", http.StatusUnauthorized)
            return
        }
        claims, err := am.validateToken(strings.TrimPrefix(token, "Bearer "))
        if err != nil {
            http.Error(w, "invalid token", http.StatusForbidden)
            return
        }
        ctx := context.WithValue(r.Context(), "user_id", claims.UserID)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}`,
logs:["go build ./...","ok  middleware 0.024s","go test -v ./middleware/...","=== RUN   TestAuthMiddleware","--- PASS: TestAuthMiddleware (0.01s)","=== RUN   TestSkipPaths","--- PASS: TestSkipPaths (0.00s)","PASS"],
chat:["Reviewing auth middleware for security issues...","Good: skipPaths properly checked with HasPrefix.","Warning: Consider rate limiting on /login to prevent brute force.","Suggestion: Add token refresh endpoint to skipPaths."],
sug:["http.Handler","context.WithValue","jwt.Parse","strings.TrimPrefix"]},

{file:"docker-compose.yml",path:"deploy > config",lang:"YAML",icon:"#CB171E",
content:`version: '3.8'

services:
  api-gateway:
    build:
      context: ./gateway
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://cache:6379
      - DATABASE_URL=postgres://db:5432/app
    depends_on:
      - cache
      - database
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  worker:
    build: ./worker
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    environment:
      - QUEUE_URL=amqp://rabbitmq:5672

  cache:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: app
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  redis_data:
  pg_data:`,
logs:["docker-compose config --quiet","docker-compose build api-gateway","Step 1/8 : FROM node:20-alpine","Step 2/8 : WORKDIR /app","Successfully built a3f2e1d4b5c6","docker-compose up -d","Creating network 'app_default'","api-gateway_1 | Server listening on :8080"],
chat:["Analyzing Docker Compose configuration...","Security: DB password uses env var - good practice.","Performance: Worker replicas set to 3, consider auto-scaling.","Tip: Add restart: unless-stopped for production resilience."],
sug:["depends_on","healthcheck","environment","volumes"]},

{file:"schema.prisma",path:"prisma",lang:"Prisma",icon:"#2D3748",
content:`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  sessions  Session[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  tags      Tag[]
  createdAt DateTime @default(now())
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
  MODERATOR
}`,
logs:["prisma generate","✔ Generated Prisma Client in 1.2s","prisma db push","🚀 Your database is now in sync","prisma studio","Environment variables loaded from .env","Prisma Studio is up on http://localhost:5555"],
chat:["Analyzing Prisma schema for optimization...","Index suggestion: Add @@index([authorId]) on Post for faster queries.","Consider adding soft delete with deletedAt field.","Role enum looks good - consider adding EDITOR role."],
sug:["@id","@default","@relation","@unique"]},

{file:"useWebSocket.ts",path:"src > hooks",lang:"TypeScript",icon:"#3178C6",
content:`import { useEffect, useRef, useState, useCallback } from 'react';

interface WSOptions {
  reconnectDelay?: number;
  maxRetries?: number;
  onMessage?: (data: any) => void;
}

export function useWebSocket(url: string, options: WSOptions = {}) {
  const [status, setStatus] = useState<'connecting' | 'open' | 'closed'>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const retriesRef = useRef(0);
  const maxRetries = options.maxRetries ?? 5;

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('open');
      retriesRef.current = 0;
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      options.onMessage?.(data);
    };

    ws.onclose = () => {
      setStatus('closed');
      if (retriesRef.current < maxRetries) {
        retriesRef.current++;
        setTimeout(connect, options.reconnectDelay ?? 3000);
      }
    };
  }, [url, maxRetries]);

  useEffect(() => { connect(); return () => wsRef.current?.close(); }, [connect]);

  const send = useCallback((data: any) => {
    wsRef.current?.send(JSON.stringify(data));
  }, []);

  return { status, send };
}`,
logs:["[vite] hmr update: /src/hooks/useWebSocket.ts","[TypeScript] No errors found","[vitest] Running 4 tests...","✓ connects to WebSocket server","✓ handles reconnection on close","✓ sends JSON messages correctly","✓ respects maxRetries limit","All tests passed (0.8s)"],
chat:["Reviewing WebSocket hook for memory leaks...","Good: Cleanup function properly closes connection.","Edge case: Add error handler for ws.onerror event.","Consider adding heartbeat/ping mechanism for connection health."],
sug:["useCallback","useRef","useState","WebSocket"]},

{file:"Makefile",path:"project root",lang:"Makefile",icon:"#427819",
content:`.PHONY: build test clean deploy lint

VERSION := $(shell git describe --tags --always)
BUILD_TIME := $(shell date -u +%Y%m%d%H%M%S)
LDFLAGS := -ldflags "-X main.version=$(VERSION) -X main.buildTime=$(BUILD_TIME)"

build:
\t@echo "Building $(VERSION)..."
\tgo build $(LDFLAGS) -o bin/server ./cmd/server
\t@echo "Build complete"

test:
\tgo test -race -coverprofile=coverage.out ./...
\tgo tool cover -func=coverage.out | tail -1

lint:
\tgolangci-lint run ./...
\tgo vet ./...

clean:
\trm -rf bin/ coverage.out

deploy: build
\tdocker build -t app:$(VERSION) .
\tdocker push registry.io/app:$(VERSION)
\tkubectl set image deployment/app app=registry.io/app:$(VERSION)

migrate:
\tgo run ./cmd/migrate up

seed:
\tgo run ./cmd/seed --env=$(ENV)`,
logs:["make build","Building v2.4.1-g8a3f2e1...","go build -ldflags ... -o bin/server","Build complete","make test","ok   cmd/server  0.45s  coverage: 78.2%","ok   pkg/auth    0.12s  coverage: 92.1%","Total coverage: 82.4%"],
chat:["Analyzing Makefile targets...","Good: VERSION uses git describe for reproducible builds.","Suggestion: Add 'make docker' target for local development.","CI/CD: Consider adding 'make ci' that runs lint + test + build."],
sug:["$(shell","LDFLAGS",".PHONY","kubectl"]},

{file:"nginx.conf",path:"deploy > proxy",lang:"Nginx",icon:"#009639",
content:`upstream api_backend {
    least_conn;
    server api-1:8080 weight=3;
    server api-2:8080 weight=2;
    server api-3:8080 backup;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate     /etc/ssl/certs/api.pem;
    ssl_certificate_key /etc/ssl/private/api.key;
    ssl_protocols       TLSv1.2 TLSv1.3;

    location /api/ {
        proxy_pass http://api_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
    }

    location /ws/ {
        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /static/ {
        alias /var/www/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /health {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}`,
logs:["nginx -t","nginx: configuration file syntax is ok","nginx: configuration file test is successful","nginx -s reload","[notice] signal process started","SSL: api.pem expires in 45 days","Upstream: api-1 active, api-2 active, api-3 standby"],
chat:["Reviewing Nginx configuration...","Security: TLS 1.2+ only - good practice.","Performance: Static files cache 30d with immutable header.","Suggestion: Add rate limiting to /api/ location block."],
sug:["proxy_pass","upstream","ssl_protocols","proxy_set_header"]},

{file:"migration_v42.sql",path:"db > migrations",lang:"SQL",icon:"#336791",
content:`BEGIN;

-- Add analytics tables for user engagement tracking
CREATE TABLE IF NOT EXISTS user_events (
    id          BIGSERIAL PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users(id),
    event_type  VARCHAR(50) NOT NULL,
    metadata    JSONB DEFAULT '{}',
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX CONCURRENTLY idx_events_user_id
    ON user_events(user_id);
CREATE INDEX CONCURRENTLY idx_events_type_created
    ON user_events(event_type, created_at DESC);

-- Materialized view for daily aggregation
CREATE MATERIALIZED VIEW daily_active_users AS
SELECT
    DATE_TRUNC('day', created_at) AS day,
    COUNT(DISTINCT user_id) AS active_users,
    COUNT(*) AS total_events,
    jsonb_object_agg(event_type, cnt) AS breakdown
FROM (
    SELECT user_id, event_type, created_at,
           COUNT(*) as cnt
    FROM user_events
    GROUP BY user_id, event_type, created_at
) sub
GROUP BY DATE_TRUNC('day', created_at);

CREATE UNIQUE INDEX ON daily_active_users(day);

COMMIT;`,
logs:["psql -f migration_v42.sql","BEGIN","CREATE TABLE user_events","CREATE INDEX idx_events_user_id","CREATE INDEX idx_events_type_created","CREATE MATERIALIZED VIEW daily_active_users","COMMIT","Migration v42 applied successfully"],
chat:["Reviewing SQL migration...","Good: CONCURRENTLY indexes won't lock the table.","Materialized view needs REFRESH schedule - consider pg_cron.","Security: Ensure user_id FK has ON DELETE CASCADE if needed."],
sug:["CREATE TABLE","CREATE INDEX","JSONB","DATE_TRUNC"]},

{file:"k8s_deploy.yaml",path:"deploy > kubernetes",lang:"YAML",icon:"#326CE5",
content:`apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  namespace: production
  labels:
    app: api-server
    version: v2.4.1
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
      - name: api
        image: registry.io/api:v2.4.1
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 250m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5`,
logs:["kubectl apply -f k8s_deploy.yaml","deployment.apps/api-server configured","kubectl rollout status deployment/api-server","Waiting for rollout to finish: 1 of 3 updated","Waiting for rollout to finish: 2 of 3 updated","deployment 'api-server' successfully rolled out","kubectl get pods -n production","api-server-7d8f9b6c4-x2k9p  1/1  Running  0  45s"],
chat:["Analyzing Kubernetes deployment manifest...","Good: RollingUpdate with maxUnavailable=0 ensures zero downtime.","Resource limits properly set - prevents noisy neighbor issues.","Consider adding PodDisruptionBudget for HA guarantees."],
sug:["replicas","resources","livenessProbe","containerPort"]},

{file:"cache_service.rs",path:"src > services",lang:"Rust",icon:"#DEA584",
content:`use redis::{AsyncCommands, Client};
use serde::{Deserialize, Serialize};
use std::time::Duration;

pub struct CacheService {
    client: Client,
    default_ttl: Duration,
}

impl CacheService {
    pub fn new(redis_url: &str) -> Result<Self, redis::RedisError> {
        let client = Client::open(redis_url)?;
        Ok(Self {
            client,
            default_ttl: Duration::from_secs(3600),
        })
    }

    pub async fn get<T: for<'de> Deserialize<'de>>(&self, key: &str) -> Option<T> {
        let mut conn = self.client.get_async_connection().await.ok()?;
        let data: Option<String> = conn.get(key).await.ok()?;
        data.and_then(|s| serde_json::from_str(&s).ok())
    }

    pub async fn set<T: Serialize>(&self, key: &str, value: &T) -> Result<(), CacheError> {
        let mut conn = self.client.get_async_connection().await?;
        let json = serde_json::to_string(value)?;
        conn.set_ex(key, json, self.default_ttl.as_secs() as usize).await?;
        Ok(())
    }

    pub async fn invalidate(&self, pattern: &str) -> Result<u64, CacheError> {
        let mut conn = self.client.get_async_connection().await?;
        let keys: Vec<String> = redis::cmd("KEYS").arg(pattern).query_async(&mut conn).await?;
        if keys.is_empty() { return Ok(0); }
        let count = conn.del::<_, u64>(&keys).await?;
        Ok(count)
    }
}`
,logs:["cargo test --package cache-service","running 6 tests...","test get_existing_key ... ok","test get_missing_key ... ok","test set_with_ttl ... ok","test invalidate_pattern ... ok","test concurrent_access ... ok","test result: ok. 6 passed; 0 failed"],
chat:["Reviewing cache service implementation...","Good: Generic get/set with serde for type-safe caching.","Warning: KEYS command can be slow in production - use SCAN instead.","Consider adding connection pooling with bb8 or deadpool."],
sug:["AsyncCommands","serde_json","Duration","get_async_connection"]}
];

// === DOM Elements ===
const codeEl=document.getElementById('code'),gutterEl=document.getElementById('gutter');
const termEl=document.getElementById('term-out'),chatEl=document.getElementById('agent-chat');
const tabsEl=document.getElementById('tabs-bar'),bcFileEl=document.getElementById('bc-file');
const stPosEl=document.getElementById('st-pos'),popupEl=document.getElementById('intellisense');
const searchBox=document.getElementById('search-box'),searchInput=document.getElementById('search-input');
const searchInfo=document.getElementById('search-info'),debugVars=document.getElementById('debug-vars');
const fakeCursor=document.getElementById('fake-cursor');

// === Shuffle & State ===
let queue=[],usedScenes=new Set(),currentTabs=[];
function pickNext(){
    if(queue.length===0){queue=[...Array(S.length).keys()];
    for(let i=queue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[queue[i],queue[j]]=[queue[j],queue[i]]}}
    return queue.pop();
}
function wait(ms){return new Promise(r=>setTimeout(r,ms))}
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}

// === Syntax Highlighter ===
function hl(t){if(!t)return'';let h=t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
h=h.replace(/\b(import|export|from|class|function|const|let|var|async|await|return|if|else|for|while|try|catch|pub|use|struct|impl|fn|mod|type|throw|new|yield|package|func|def|self|None|True|False|SELECT|FROM|WHERE|JOIN|CREATE|TABLE|INDEX|INSERT|UPDATE|DELETE|BEGIN|COMMIT|AS|NOT|NULL|DEFAULT|AND|OR|GROUP BY|ORDER BY)\b/g,'<span class="kwd">$1</span>');
h=h.replace(/\b(String|number|boolean|void|any|Vec|Option|Result|Self|Promise|int|float|str|dict|list|bool|error|context|http)\b/g,'<span class="typ">$1</span>');
h=h.replace(/\b([a-zA-Z_]\w*)(?=\()/g,'<span class="fn">$1</span>');
h=h.replace(/(["'].*?["'])/g,'<span class="str">$1</span>');h=h.replace(/(`[^`]*`)/g,'<span class="str">$1</span>');
h=h.replace(/(\/\/.*|#.*)/g,'<span class="cmt">$1</span>');h=h.replace(/(--.*)/g,'<span class="cmt">$1</span>');
h=h.replace(/\b(\d[\d.]*)\b/g,'<span class="num">$1</span>');
h=h.replace(/@(\w+)/g,'<span class="kw2">@$1</span>');
return h}

// === Terminal ===
function addTerm(logs){logs.forEach(l=>{const d=document.createElement('div');d.className='term-line';
if(l.includes('Error')||l.includes('FAIL'))d.style.color='#f48771';
else if(l.includes('warn')||l.includes('Warning'))d.style.color='#cca700';
else if(l.includes('INFO')||l.includes('PASS')||l.includes('✓')||l.includes('ok')||l.includes('success'))d.style.color='#89d185';
else d.style.color='#ccc';d.innerText='> '+l;termEl.appendChild(d);termEl.scrollTop=termEl.scrollHeight})}

// === Agent Chat ===
function addChat(t){const d=document.createElement('div');d.className='chat-bubble';d.innerHTML='<strong>Copilot</strong>: '+t;chatEl.appendChild(d);chatEl.scrollTop=chatEl.scrollHeight}

// === Tabs ===
function renderTabs(activeFile){
    if(!currentTabs.includes(activeFile))currentTabs.push(activeFile);
    if(currentTabs.length>5)currentTabs.shift();
    tabsEl.innerHTML=currentTabs.map(f=>{const sc=S.find(s=>s.file===f);
    return`<div class="tab ${f===activeFile?'active':''}" style="gap:6px"><span style="color:${sc?sc.icon:'#ccc'}">📄</span>${f}<span class="tab-close">×</span></div>`}).join('')}

// === IntelliSense ===
async function showPopup(el,sugs){const r=el.getBoundingClientRect();popupEl.style.left=(r.right+5)+'px';popupEl.style.top=(r.bottom+5)+'px';popupEl.style.display='block';
popupEl.innerHTML=sugs.map((s,i)=>`<div class="suggest-row ${i===0?'sel':''}"><span class="sug-icon" style="background:${i===0?'#c586c0':'#9cdcfe'}"></span>${s}</div>`).join('');
await wait(rand(400,700));popupEl.style.display='none'}

// === BEHAVIOR: Search Simulation ===
async function simulateSearch(sc){
    const terms=["TODO","async","return","config","error","import","function","const"];
    const term=terms[rand(0,terms.length-1)];
    searchBox.style.display='block';searchInput.value='';
    for(let i=0;i<term.length;i++){searchInput.value+=term[i];await wait(rand(60,120))}
    const matches=rand(2,18);searchInfo.innerText=`${matches} results in ${rand(3,12)} files`;
    await wait(rand(1500,3000));searchBox.style.display='none';
}

// === BEHAVIOR: Debug Simulation ===
async function simulateDebug(){
    const lines=codeEl.querySelectorAll('div');if(lines.length<5)return;
    const bpLine=rand(3,Math.min(lines.length-1,15));
    lines[bpLine].classList.add('breakpoint');
    await wait(800);
    const vars=[{n:'request_id',v:'"a3f2-e1d4"'},{n:'user_count',v:'1847'},{n:'is_valid',v:'true'},{n:'latency_ms',v:'42.7'},{n:'status',v:'"200 OK"'}];
    const picked=vars.sort(()=>Math.random()-.5).slice(0,rand(2,4));
    debugVars.innerHTML=picked.map(v=>`<div class="debug-var-row"><span class="debug-var-name">${v.n}</span><span class="debug-var-val">${v.v}</span></div>`).join('');
    debugVars.style.display='block';
    await wait(rand(2000,4000));
    lines[bpLine].classList.remove('breakpoint');debugVars.style.display='none';
}

// === BEHAVIOR: Tab Switching ===
async function simulateTabSwitch(){
    if(currentTabs.length<2)return;
    const otherTab=currentTabs[rand(0,currentTabs.length-2)];
    renderTabs(otherTab);await wait(rand(800,1500));
    renderTabs(currentTabs[currentTabs.length-1]);
}

// === BEHAVIOR: Scroll/Read Code ===
async function simulateReading(){
    const lines=codeEl.querySelectorAll('div');if(lines.length<10)return;
    for(let i=0;i<rand(3,6);i++){
        const target=lines[rand(0,lines.length-1)];
        target.style.background='rgba(255,255,255,0.05)';
        target.scrollIntoView({block:'center',behavior:'smooth'});
        await wait(rand(400,800));target.style.background=''}
}

// === BEHAVIOR: Fake Mouse Movement ===
let mouseActive=false;
async function moveFakeCursor(){
    if(mouseActive)return;mouseActive=true;fakeCursor.style.display='block';
    const edRect=codeEl.getBoundingClientRect();
    let cx=edRect.left+rand(50,200),cy=edRect.top+rand(30,150);
    fakeCursor.style.left=cx+'px';fakeCursor.style.top=cy+'px';
    for(let i=0;i<rand(8,15);i++){
        const tx=cx+rand(-80,80),ty=cy+rand(-60,60);
        const steps=rand(10,20);const dx=(tx-cx)/steps,dy=(ty-cy)/steps;
        for(let s=0;s<steps;s++){cx+=dx;cy+=dy;
        fakeCursor.style.left=cx+'px';fakeCursor.style.top=cy+'px';await wait(16)}
        await wait(rand(200,600))}
    fakeCursor.style.display='none';mouseActive=false;
}

// === Type a Line ===
async function typeLine(el,text,sc){let typed='';const willTypo=Math.random()>.88;const typoAt=Math.floor(Math.random()*(text.length-2))+1;
for(let i=0;i<text.length;i++){
if(text[i]==='.'&&Math.random()>.65)await showPopup(el,sc.sug);
if(willTypo&&i===typoAt){typed+='k';el.innerHTML=hl(typed)+'<span class="cursor-blink"></span>';await wait(rand(100,180));typed=typed.slice(0,-1);el.innerHTML=hl(typed)+'<span class="cursor-blink"></span>';await wait(rand(60,120))}
typed+=text[i];el.innerHTML=hl(typed)+'<span class="cursor-blink"></span>';await wait(rand(15,40))}
el.innerHTML=hl(typed)}

// === Main Scenario Runner ===
async function run(idx){
    const sc=S[idx];renderTabs(sc.file);bcFileEl.innerText=sc.file;
    codeEl.innerHTML='';gutterEl.innerHTML='';
    termEl.innerHTML='<div class="term-line" style="color:#ccc">PS E:\\ICT\\coding\\VSCode_Vibe_Simulator&gt;</div>';
    chatEl.innerHTML='';addChat(`Analyzing context for <strong>${sc.file}</strong>...`);
    const lines=sc.content.split('\n');

    for(let i=0;i<lines.length;i++){
        const nd=document.createElement('div');nd.innerText=i+1;gutterEl.appendChild(nd);
        const ld=document.createElement('div');codeEl.appendChild(ld);ld.scrollIntoView({block:'nearest'});
        stPosEl.innerText=`Ln ${i+1}, Col ${lines[i].length+1}`;
        await typeLine(ld,lines[i],sc);

        // Trigger events at various points
        if(i===2)addTerm(sc.logs.slice(0,2));
        if(i===5){addChat(sc.chat[0]);if(Math.random()>.5)addChat(sc.chat[1])}
        if(i===10)addTerm(sc.logs.slice(2,5));
        if(i===15&&Math.random()>.6)moveFakeCursor(); // non-blocking
        if(i===lines.length-4)addTerm(sc.logs.slice(5));
        if(i===lines.length-2){addChat(sc.chat[sc.chat.length-1]);addChat(sc.chat[sc.chat.length-2])}

        // Random "thinking" pauses
        if(Math.random()>.92)await wait(rand(500,1500));
    }

    // Post-typing behaviors (randomly pick 1-2)
    const behaviors=[simulateReading,simulateSearch,simulateDebug,simulateTabSwitch];
    const numBehaviors=rand(1,2);
    const shuffled=behaviors.sort(()=>Math.random()-.5);
    for(let i=0;i<numBehaviors;i++){await shuffled[i](sc);await wait(rand(500,1000))}

    // Occasionally show a long "thinking" pause
    if(Math.random()>.7)await wait(rand(1500,3500));
    else await wait(rand(800,1500));

    // Next random scenario
    run(pickNext());
}

// === Start ===
currentTabs=[];
run(pickNext());
