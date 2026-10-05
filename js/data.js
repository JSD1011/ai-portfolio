/**
 * Jaymin Dabhi — AI Engineer Portfolio
 * Master Technical Architecture & Project Specifications Data
 * Strictly adhering to actual project scope without invented metrics or claims.
 */

const PORTFOLIO_DATA = {
  // =========================================================================
  // PROJECTS (All 10 required architectural points per project)
  // =========================================================================
  projects: {
    p1: {
      id: "p1",
      number: "01",
      title: "Enterprise AI Assistant / Enterprise RAG Chatbot",
      category: "Agentic RAG · Enterprise Search · LLM Application",
      badge: "Core Project",
      shortDesc: "An enterprise-oriented AI assistant designed to answer questions over organizational knowledge using retrieval-augmented generation.",
      technologies: [
        "Python", "LangChain", "LlamaIndex", "Qdrant / Vector Database",
        "OpenAI / LLM APIs", "Ollama", "Embedding Models"
      ],
      points: {
        problem: "Unstructured organizational documents (PDFs, policies, technical manuals) are siloed and difficult to query accurately. Traditional lexical search fails to understand semantic relationships and natural language intent, while standard LLMs suffer from domain knowledge cutoff and hallucinate when asked enterprise-specific questions.",
        architecture: "Document Loader → Text Processing → Chunking → Embedding → Vector Store (Qdrant) → Retriever → Context Builder → LLM (OpenAI / Ollama) → Grounded Response",
        workflowDesign: "The workflow functions as a coordinated retrieval-generation loop: ingested documents undergo boundary-aware chunking and vector indexing. During runtime, user queries are embedded, filtered against Qdrant collections via semantic similarity thresholds, assembled into a synthesized prompt with source citations, and passed to the LLM for grounded completion.",
        myContribution: [
          "Designed the overall RAG workflow from raw ingestion to context construction and generation.",
          "Implemented document ingestion and preprocessing pipelines to normalize heterogeneous formats.",
          "Worked on chunking strategies and embedding pipelines, evaluating semantic boundaries and token overlap.",
          "Integrated vector databases for semantic retrieval, configuring Qdrant collections with optimized distance metrics.",
          "Designed retrieval-to-generation flow, ensuring query intent maps accurately to indexed vectors.",
          "Integrated LLMs with the retrieval pipeline, coordinating LlamaIndex indexes with LangChain orchestrators.",
          "Worked on prompt/context construction to enforce grounded answers and reduce hallucinations.",
          "Experimented with open-source (Ollama) and hosted LLMs (OpenAI APIs) to evaluate latency and cost trade-offs.",
          "Focused on improving retrieval quality and reducing irrelevant context passed into the token window."
        ],
        technologiesUsed: "Python, LangChain, LlamaIndex, Qdrant, OpenAI APIs, Ollama, nomic-embed-text / text-embedding-3-small.",
        engineeringDecisions: "Why chunking, embeddings, vector search, and context construction matter: Arbitrary chunking risks fracturing sentences and destroying semantic context; too large chunks flood the model prompt with irrelevant noise. I prioritized configurable chunk sizes with sliding window token overlap, selected dense vector embeddings for semantic matching, and engineered strict context-builder templates that instruct the LLM to only answer based on retrieved source passages.",
        challenges: "Managing retrieval noise and out-of-domain queries. If a retrieved document chunk only tangentially relates to the user prompt, naive RAG prompts can induce subtle hallucinations. Addressing this required tuning retrieval similarity thresholds and crafting guardrail prompts that explicitly instruct the model to state when context is insufficient.",
        internalMechanics: "1. Raw files parsed into document objects.\n2. Recursive character splitter creates overlapping chunks.\n3. Embeddings generated via vector model and stored in Qdrant with payload metadata.\n4. At query time, user query is embedded with identical vector dimensions.\n5. Cosine similarity search retrieves top-k matching segments.\n6. Context builder aggregates text segments and injects them into the system prompt.\n7. Model generates response constrained to provided context.",
        learnings: "RAG quality is almost entirely determined by ingestion and retrieval fidelity rather than the parameter scale of the generation model. Better chunking and stricter context formatting produce far better enterprise accuracy than simply switching to a larger LLM.",
        futureImprovements: "Implement hybrid retrieval (combining BM25 lexical keyword search with dense vector embeddings), integrate cross-encoder rerankers (e.g. Cohere or BGE reranker) before context synthesis, and implement automated document update listeners."
      }
    },

    p2: {
      id: "p2",
      number: "02",
      title: "Text-to-SQL Multi-Agent System",
      category: "Multi-Agent AI · Text-to-SQL · Database Agents",
      badge: "Flagship / Most Technically Impressive",
      shortDesc: "A multi-agent Text-to-SQL system that converts natural-language questions into SQL queries against a PostgreSQL database through orchestrated schema filtering, SQL generation, and deterministic syntax validation.",
      technologies: [
        "Python", "Flask", "LangGraph", "LangChain", "PostgreSQL",
        "SQLDatabaseChain", "SQLCoder", "Reasoning LLM", "vLLM"
      ],
      points: {
        problem: "Translating natural language into SQL against real relational databases fails when using simple monolithic LLM prompts. Dumping large database schemas exceeds token limits, confuses the model, causes column/table hallucinations, and generates invalid or unsafe SQL queries that crash database execution.",
        architecture: "User Question → Router Agent → Column Selection Agent → SQL Generation Agent → SQL Validation → Database Execution → Structured JSON Response",
        workflowDesign: "Built as a LangGraph stateful multi-agent system where specialized nodes execute sequential transformations over an explicit state dictionary. A Router Agent classifies the intent; a Column Selection Agent prunes the schema metadata down to relevant tables and columns; a SQL Generation Agent invokes SQLCoder/Reasoning LLM; a Validation node parses the AST and verifies syntax before any query reaches the PostgreSQL database.",
        myContribution: [
          "Designed the multi-agent workflow from ground up using LangGraph.",
          "Implemented agent-to-agent orchestration using LangGraph state passing and conditional edge transitions.",
          "Designed routing logic to identify query intent and route requests appropriately.",
          "Worked on database metadata and schema handling, structuring table definitions, types, and foreign key relations.",
          "Implemented column and table selection logic to eliminate unnecessary schema context from prompts.",
          "Integrated SQL generation models (specialized SQLCoder and reasoning LLMs).",
          "Added SQL validation before execution, verifying syntax and schema validity to prevent query failures.",
          "Connected the workflow with PostgreSQL using safe read-only database execution wrappers.",
          "Designed structured output handling, formatting results into clean JSON responses with execution context.",
          "Worked on reducing unnecessary schema information passed to the LLM to preserve prompt budget and improve accuracy.",
          "Debugged and refined agent workflow behavior across edge cases and multi-agent state transitions."
        ],
        technologiesUsed: "Python, Flask, LangGraph, LangChain, PostgreSQL, SQLDatabaseChain, SQLCoder, Reasoning LLM, vLLM.",
        engineeringDecisions: "Decoupled schema pruning from SQL generation. By introducing a dedicated Column Selection agent, the SQL generation model receives only the minimal subset of DDL metadata required for the specific question. Enforced deterministic SQL validation before database execution so malformed queries never reach the PostgreSQL engine.",
        challenges: "Handling database schema complexity, relationship ambiguity, and non-trivial joins. Natural language queries like 'Show total trips completed by employees from Delhi' require joining employee records with trip logs and filtering by office locations without hallucinating nonexistent foreign keys.",
        internalMechanics: "1. State dictionary initialized with user query and session metadata.\n2. Router Agent determines if query requires DB access.\n3. Column Selection Agent inspects PostgreSQL catalog metadata, selecting only relevant tables and columns.\n4. Filtered schema and question are formatted into a structured prompt for SQLCoder/LLM.\n5. SQL Validation node parses generated SQL, checking for forbidden keywords (DROP, DELETE) and syntax errors.\n6. PostgreSQL runner executes validated SQL within a read-only transaction.\n7. Response layer packages the raw record set and query metadata into a structured JSON output.",
        learnings: "Multi-agent separation of concerns dramatically increases system resilience. Giving a specialized agent a single, well-defined task (e.g. only select columns or only validate syntax) yields far higher reliability than expecting one prompt to do everything.",
        futureImprovements: "Implement self-correcting cyclic graph loops where database execution errors or validation failures are fed back into the SQL generation node with error traces for automated correction."
      }
    },

    p3: {
      id: "p3",
      number: "03",
      title: "Production-Oriented AI SQL Chatbot",
      category: "LLM · SQL Agent · LangGraph · Production Architecture",
      badge: "Production Architecture",
      shortDesc: "A production-oriented SQL agent engineered with a Flask REST API and LangGraph workflow, transitioning simple prompt execution into a resilient, decoupled database conversational system.",
      technologies: [
        "Python", "Flask", "LangGraph", "LangChain", "PostgreSQL",
        "SQLDatabaseChain", "SQLCoder", "Reasoning LLM", "vLLM"
      ],
      points: {
        problem: "Moving from proof-of-concept text-to-SQL notebooks to production requires addressing API integration, concurrent state management, model serving latency, strict query validation, and deterministic structured outputs.",
        architecture: "Flask REST API → LangGraph Workflow → Router Agent → Schema / Column Selection → SQL Generation → SQL Validation → Database → JSON Response",
        workflowDesign: "Built around a clear engineering goal: 'Move beyond a simple text-to-SQL prompt and create a structured workflow with routing, schema selection, SQL generation, validation, and structured output.' Exposes standard REST endpoints while maintaining modular internal agent states.",
        myContribution: [
          "Architected the Flask REST API service exposing agent endpoints for external client integrations.",
          "Implemented modular agent workflow separation inside LangGraph to prevent monolithic prompt coupling.",
          "Configured model serving pipelines utilizing vLLM for high-throughput inference with open-source SQL models.",
          "Implemented strict schema extraction and column filtering modules to optimize context windows.",
          "Engineered pre-execution query validation safeguards ensuring database stability.",
          "Standardized structured API responses returning execution time, generated query, and formatted data."
        ],
        technologiesUsed: "Python, Flask, LangGraph, LangChain, PostgreSQL, SQLCoder, vLLM, Docker.",
        engineeringDecisions: "Adopted a decoupled architecture where the API layer (Flask), orchestration engine (LangGraph), and model inference server (vLLM) operate independently. This allows updating LLM models or database connectors without refactoring core routing logic.",
        challenges: "Balancing inference latency with multi-step agent validation. Running sequential agent nodes can introduce delay; optimized prompt lengths and utilized vLLM PagedAttention to maintain responsive generation speeds.",
        internalMechanics: "The Flask application receives HTTP POST requests, extracts query payload, invokes the compiled LangGraph state machine, captures agent step traces, runs validation against PostgreSQL schema catalog, and returns sanitized JSON responses.",
        learnings: "Production AI engineering requires treating agent state transitions like backend microservices: every input, schema transition, and model output must have deterministic error handling and validation.",
        futureImprovements: "Add Redis-based caching for frequent natural language questions and schema metadata, and implement streaming response tokens for progressive UI rendering."
      }
    },

    p4: {
      id: "p4",
      number: "04",
      title: "Runtime PDF RAG / Mini RAG System",
      category: "RAG · Document Intelligence · Vector Search",
      badge: "Runtime Search",
      shortDesc: "A runtime document-question-answering system where a PDF can be provided dynamically and converted into a searchable knowledge source using local embeddings and inference.",
      technologies: [
        "Python", "FastAPI", "Qdrant", "Ollama", "Llama 3.2", "nomic-embed-text"
      ],
      points: {
        problem: "Users frequently need to analyze single ad-hoc documents or reports immediately without undergoing lengthy offline vector database ingestion or paying third-party cloud API costs.",
        architecture: "PDF → Text Extraction → Chunking → Embedding → Qdrant → Semantic Retrieval → LLM → Answer",
        workflowDesign: "A lightweight, ephemeral RAG pipeline that processes incoming PDF files dynamically at runtime, chunks the extracted text, indexes embeddings into an isolated Qdrant collection, retrieves relevant segments against user questions, and streams synthesized answers via Ollama.",
        myContribution: [
          "Designed the document ingestion pipeline for runtime PDF processing.",
          "Worked on PDF text extraction and multi-page stream parsing.",
          "Implemented chunking strategies suited for document-specific sections.",
          "Integrated embedding generation using nomic-embed-text via local endpoints.",
          "Stored embeddings in Qdrant collections with dynamic runtime collection lifecycles.",
          "Implemented semantic retrieval and similarity search against indexed document sections.",
          "Integrated Ollama for local LLM inference running Llama 3.2.",
          "Designed the question-answering workflow to provide grounded answers with exact source references."
        ],
        technologiesUsed: "Python, FastAPI, Qdrant, Ollama, Llama 3.2, nomic-embed-text.",
        engineeringDecisions: "Utilized local embedding models (nomic-embed-text) and local LLM runtime (Ollama) to ensure privacy, zero API costs, and rapid offline execution. Qdrant was selected for its fast in-memory and persistent vector collection capabilities.",
        challenges: "Efficiently extracting text from complex multi-column PDF layouts and ensuring that newly uploaded documents are indexed without blocking synchronous API worker threads.",
        internalMechanics: "PDF upload triggers FastAPI background task → text parsed and chunked with boundary awareness → nomic-embed-text generates vector embeddings → embeddings stored in a temporary Qdrant collection keyed by document ID → queries execute cosine vector search → retrieved passages injected into Llama 3.2 prompt template.",
        learnings: "Building a lightweight, local-first RAG stack provides deep insight into raw vector indexing speeds, embedding generation latencies, and prompt template sensitivity without cloud abstractions.",
        futureImprovements: "Add OCR support for scanned documents, implement multi-document cross-comparison, and add document summarization agent nodes."
      }
    }
  },

  // =========================================================================
  // SECTION 2: INTERACTIVE PIPELINE STEPS
  // =========================================================================
  pipelineSteps: {
    query: {
      badge: "STEP 01 · USER QUERY",
      framework: "State Ingestion",
      title: "Ingesting & Structuring Natural Language Input",
      desc: "User questions are sanitized, checked for session context, and converted into an immutable state dictionary inside LangGraph/LangChain.",
      snippet: 'State: { query: "Show total trips completed by employees from Delhi", session_id: "usr_99", route: None, schema_subset: None }'
    },
    router: {
      badge: "STEP 02 · ROUTER / PLANNER",
      framework: "LangGraph Conditional Edge",
      title: "Classifying Intent & Selecting Optimal Workflow",
      desc: "The Router Agent evaluates semantic intent. If the query requires relational data, it routes to the SQL agent path; if it requires unstructured knowledge, it routes to RAG vector retrieval.",
      snippet: 'Routing Decision: "SQL_WORKFLOW" (Target: PostgreSQL via Column Selection Node)'
    },
    agent: {
      badge: "STEP 03 · SPECIALIZED AGENT",
      framework: "Dedicated Agent Node",
      title: "Executing Domain-Specific Agent Tasks",
      desc: "Specialized agents perform focused operations without prompt bloat. In Text-to-SQL, the Column Selection Agent prunes irrelevant schema metadata down to relevant entities.",
      snippet: 'Selected Entities: [employees (id, name, office_id), offices (id, city="Delhi"), trips (id, employee_id, status)]'
    },
    tools: {
      badge: "STEP 04 · TOOLS / RETRIEVAL / DB",
      framework: "Deterministic Tool Execution",
      title: "Interacting with Vector Stores & Relational Databases",
      desc: "Agents invoke deterministic tools: executing vector similarity queries against Qdrant or extracting specific schema catalogs from PostgreSQL.",
      snippet: 'Tool Call: postgres_schema_tool.get_table_info(tables=["employees", "offices", "trips"])'
    },
    validation: {
      badge: "STEP 05 · VALIDATION WORKFLOW",
      framework: "Safety & Syntax Guardrail",
      title: "Deterministic Pre-Execution Verification",
      desc: "Generated SQL or structured outputs are parsed via ASTs and syntax checkers before touching production databases. Prevents injection, Cartesian joins, and syntax failures.",
      snippet: 'Validation AST Check: PASS | Read-Only: TRUE | Tables Exist: TRUE | Forbidden Clauses: NONE'
    },
    reasoning: {
      badge: "STEP 06 · LLM REASONING",
      framework: "Inference & Synthesis",
      title: "Contextual Synthesis & Model Grounding",
      desc: "The reasoning model (SQLCoder, OpenAI, or Llama 3.2) generates the final SQL query or natural-language summary grounded strictly within the retrieved context.",
      snippet: 'Generated SQL: SELECT count(t.id) FROM trips t JOIN employees e ON t.emp_id = e.id JOIN offices o ON e.office_id = o.id WHERE o.city = \'Delhi\''
    },
    response: {
      badge: "STEP 07 · FINAL RESPONSE",
      framework: "Structured Output",
      title: "Delivering Formatted & Validated Results",
      desc: "System formats the validated execution output into structured JSON payloads with query metadata, raw database rows, and grounded natural-language explanations.",
      snippet: 'Response Payload: { "status": "success", "query_executed": "SELECT ...", "data": [{"total_trips": 142}], "execution_time_ms": 28 }'
    }
  },

  // =========================================================================
  // SECTION 4: AGENT FRAMEWORKS TECH MAP
  // =========================================================================
  techMap: {
    langgraph: {
      name: "LangGraph",
      category: "ORCHESTRATION",
      usage: "“Workflow orchestration for stateful multi-agent systems.”",
      role: "Provides directed cyclic graphs to coordinate state passing between Router, Column Selection, SQL Generation, and Validation agents, enabling reliable state transitions.",
      project: "Text-to-SQL Multi-Agent System · Production SQL Chatbot"
    },
    langchain: {
      name: "LangChain",
      category: "FRAMEWORK",
      usage: "“LLM integration, retrieval components, database interaction and application pipelines.”",
      role: "Powers database connection chains (SQLDatabaseChain), prompt templates, output parsers, and tool abstraction wrappers.",
      project: "Enterprise AI Assistant · Text-to-SQL Multi-Agent System"
    },
    llamaindex: {
      name: "LlamaIndex",
      category: "DATA FRAMEWORK",
      usage: "“Document indexing and retrieval-oriented LLM applications.”",
      role: "Handles document parsing, hierarchical index structures, and retriever abstraction layers for enterprise knowledge bases.",
      project: "Enterprise AI Assistant / Enterprise RAG"
    },
    openai: {
      name: "OpenAI APIs",
      category: "HOSTED INFERENCE",
      usage: "“API integration for reasoning, tool use, and structured outputs.”",
      role: "Used for high-accuracy intent routing, complex reasoning, and structured JSON generation via function calling and response schemas.",
      project: "Enterprise AI Assistant · Multi-Agent Workflows"
    },
    bedrock: {
      name: "AWS Bedrock",
      category: "CLOUD AI",
      usage: "“Enterprise foundation model access and managed inference.”",
      role: "Experience utilizing cloud-managed foundation models with enterprise IAM, compliance boundaries, and scalable API access.",
      project: "Enterprise LLM Application Architectures"
    },
    ollama: {
      name: "Ollama",
      category: "LOCAL RUNTIME",
      usage: "“Local/open-source model experimentation and inference.”",
      role: "Enables offline local experimentation with models like Llama 3.2 without third-party API dependencies or recurring cost.",
      project: "Runtime PDF RAG / Mini RAG System"
    },
    qdrant: {
      name: "Qdrant",
      category: "VECTOR DATABASE",
      usage: "“Vector storage and semantic retrieval.”",
      role: "Stores dense vector embeddings with metadata payload filtering, supporting high-speed cosine similarity search for RAG pipelines.",
      project: "Enterprise AI Assistant · Runtime PDF RAG"
    },
    chromadb: {
      name: "ChromaDB",
      category: "VECTOR DATABASE",
      usage: "“Lightweight vector store for prototyping and fast vector experimentation.”",
      role: "Utilized for fast in-process embedding experimentation and local vector pipeline prototyping.",
      project: "Vector Search Prototyping & Evaluation"
    },
    pinecone: {
      name: "Pinecone",
      category: "VECTOR DATABASE",
      usage: "“Managed high-throughput vector database integration.”",
      role: "Experience with cloud-native vector indexing, namespace partitioning, and production vector retrieval.",
      project: "Vector Storage Evaluation"
    },
    postgres: {
      name: "PostgreSQL",
      category: "DATABASE",
      usage: "“Relational database source, schema inspection, and SQL execution target.”",
      role: "Target database for Text-to-SQL pipelines. Work includes schema reflection, foreign key introspection, and read-only query execution.",
      project: "Text-to-SQL Multi-Agent System · Production SQL Chatbot"
    },
    vllm: {
      name: "vLLM",
      category: "INFERENCE RUNTIME",
      usage: "“High-throughput, low-latency open-source LLM serving with PagedAttention.”",
      role: "Used for self-hosting open-source models like SQLCoder with memory-efficient attention mechanisms and high concurrent token throughput.",
      project: "Production-Oriented AI SQL Chatbot"
    }
  },

  // =========================================================================
  // SECTION 6: TECHNICAL DEEP DIVE TABS
  // =========================================================================
  deepDive: {
    rag: {
      title: "Retrieval-Augmented Generation (RAG) Architecture",
      subtitle: "Ingestion, chunking strategies, vector indexing, and grounded context construction.",
      architecture: "Raw Documents → Preprocessing / Cleaning → Token-Aware Chunking → Vector Embeddings → Qdrant Vector DB → Cosine Similarity Retrieval → Context Filtering & Builder → Prompt Assembly → LLM Synthesis → Grounded Answer with Citations",
      tools: ["Python", "LangChain", "LlamaIndex", "Qdrant", "Ollama", "OpenAI Embeddings", "nomic-embed-text"],
      designDecisions: [
        "Configurable Chunking with Overlap: Avoided arbitrary character splits; used semantic boundary splitting with configurable overlap to prevent losing continuity between paragraphs.",
        "Payload Metadata in Vector Store: Stored document source, page number, and chunk index alongside vector embeddings to enable filtered queries and exact source citations.",
        "Strict Context Grounding: Instructed prompt templates to explicitly constrain answers to retrieved context to eliminate hallucinations."
      ],
      challenges: [
        "Noise vs Recall: Top-k vector retrieval can return chunks with high vector similarity but irrelevant domain facts.",
        "Context Window Saturation: Feeding too many chunks dilutes the model's attention mechanism ('lost in the middle')."
      ],
      improvements: [
        "Implement hybrid retrieval combining BM25 keyword search with dense vector embeddings.",
        "Integrate cross-encoder rerankers before final context injection to re-order top chunks by semantic relevance."
      ]
    },

    "text-to-sql": {
      title: "Text-to-SQL Multi-Agent System",
      subtitle: "Schema reduction, specialized SQL generation, and deterministic syntax validation.",
      architecture: "Natural Language Question → Intent Router → Schema / Column Selection Agent → DDL Subsetting → SQL Generation (SQLCoder / LLM) → AST & Syntax Validation → Read-Only PostgreSQL Execution → Structured JSON Response",
      tools: ["LangGraph", "LangChain", "PostgreSQL", "SQLCoder", "vLLM", "Python", "SQLDatabaseChain"],
      designDecisions: [
        "Schema Reduction Before Prompting: Rather than dumping dozens of table DDLs into the prompt, a dedicated agent selects candidate tables and columns first.",
        "Pre-Execution AST Validation: Validated generated queries using SQL parsers before execution to guarantee safety, syntax correctness, and read-only constraints.",
        "Structured Output Format: Output packaged into standardized JSON containing generated SQL, execution duration, and data records."
      ],
      challenges: [
        "Complex Relationship Navigation: Questions spanning multiple joins across indirect foreign keys require careful schema metadata representation.",
        "Dialect-Specific Nuances: Ensuring the model adheres to PostgreSQL-specific syntax (e.g. date truncations and JSON operators)."
      ],
      improvements: [
        "Implement feedback loops where database syntax errors are sent back to the SQL generation agent for self-correction.",
        "Cache frequent schema patterns and verified SQL templates for sub-second query response."
      ]
    },

    "multi-agent": {
      title: "Multi-Agent Orchestration with LangGraph",
      subtitle: "Stateful cyclic workflows, conditional edge routing, and specialized agent collaboration.",
      architecture: "State Schema Definition → Router Node → [Conditional Edge: SQL Agent | RAG Agent | Fallback] → Specialized Worker Node → Validation Guardrail → Output Assembler",
      tools: ["LangGraph", "LangChain", "Python", "StateGraph", "Pydantic"],
      designDecisions: [
        "Explicit Typed State: Defined typed state schemas so each node has predictable access to previous node outputs without global variable leakage.",
        "Conditional Edge Routing: Routed queries based on deterministic classification criteria rather than a single uncontrolled autonomous agent loop.",
        "Separation of Concerns: Isolated schema pruning, query generation, and execution into discrete nodes that can be independently debugged and unit-tested."
      ],
      challenges: [
        "State Synchronization: Managing state across asynchronous steps without race conditions or memory bloat.",
        "Infinite Recursion Avoidance: Setting strict iteration bounds and fallbacks on cyclic graph transitions."
      ],
      improvements: [
        "Add persistent SQLite/PostgreSQL checkpointing in LangGraph to resume interrupted conversations across restarts.",
        "Implement parallel tool execution for independent retrieval steps."
      ]
    },

    "vector-search": {
      title: "Vector Search & Storage Architecture",
      subtitle: "Vector indexing, distance metrics, metadata filtering, and embedding management.",
      architecture: "Text Passages → Embedding Model → High-Dimensional Vectors → Qdrant Vector Collection (HNSW Index) → Query Embedding → Cosine / Dot Product Similarity Search → Top-K Results",
      tools: ["Qdrant", "ChromaDB", "Pinecone", "FAISS", "nomic-embed-text", "Python"],
      designDecisions: [
        "Distance Metric Selection: Configured Cosine similarity for normalized embeddings, ensuring consistent similarity thresholds regardless of chunk length.",
        "Metadata Payload Indexing: Indexed document category and tenant IDs directly in Qdrant payloads to enable fast pre-filtering before vector distance calculation.",
        "Vector Dimensionality Alignment: Ensured strict compatibility between embedding model output dimensions and vector collection schemas."
      ],
      challenges: [
        "Cold Start & Collection Management: Dynamically provisioning and tearing down temporary collections during runtime PDF processing.",
        "Embedding Drift: Ensuring embedding model version matches between indexing time and query time."
      ],
      improvements: [
        "Implement sparse-dense hybrid vector storage in Qdrant for combined semantic and keyword search.",
        "Add automated periodic re-indexing and quantization to reduce memory footprint."
      ]
    },

    "llm-inference": {
      title: "LLM Inference & Serving Architecture",
      subtitle: "Hosted APIs vs self-hosted runtimes, latency optimization, and structured output parsing.",
      architecture: "Client Request → API Gateway (Flask / FastAPI) → Prompt Template & Guardrails → Inference Engine (vLLM / Ollama / OpenAI API) → Token Streaming / Output Parsing → Validated Response",
      tools: ["vLLM", "Ollama", "OpenAI APIs", "AWS Bedrock", "SQLCoder", "Llama 3.2", "Docker"],
      designDecisions: [
        "vLLM for Production Open-Source Serving: Selected vLLM with PagedAttention for running SQLCoder to achieve high concurrency and low KV-cache memory waste.",
        "Ollama for Local Prototyping: Used Ollama for rapid offline iteration with lightweight models like Llama 3.2.",
        "Hosted APIs for Complex Reasoning: Utilized OpenAI APIs when complex instruction-following or complex multi-step reasoning is required."
      ],
      challenges: [
        "Inference Latency: Multi-agent pipelines execute multiple LLM calls sequentially; minimizing generation token length is critical.",
        "Model Drift & Output Consistency: Ensuring open-source models adhere strictly to JSON schemas and SQL syntax without conversational filler."
      ],
      improvements: [
        "Implement speculative decoding or prompt caching to reduce time-to-first-token in conversational database sessions.",
        "Deploy containerized vLLM instances with auto-scaling GPU nodes in production."
      ]
    }
  },

  // =========================================================================
  // TEXT-TO-SQL AGENT INSPECTOR DETAILS
  // =========================================================================
  agentInspectors: {
    router: {
      title: "ROUTER AGENT",
      tech: "LangGraph Node · Conditional Edge",
      desc: "Determines the type of request (schema inquiry, data query, or out-of-scope non-DB request) and routes state conditionally to the appropriate downstream agent or fallback node."
    },
    column: {
      title: "COLUMN SELECTION AGENT",
      tech: "Schema Pruning Agent Node",
      desc: "Inspects database metadata and extracts only the specific tables, columns, and foreign key relationships relevant to the user query, drastically reducing token usage and hallucination risks."
    },
    sqlgen: {
      title: "SQL GENERATION AGENT",
      tech: "SQLCoder / Reasoning LLM via vLLM",
      desc: "Synthesizes syntactically accurate SQL by combining the user's natural query with the pruned schema subset and targeted few-shot database prompt templates."
    },
    validation: {
      title: "SQL VALIDATION LAYER",
      tech: "Deterministic AST & Syntax Guardrail",
      desc: "Parses generated SQL into an abstract syntax tree (AST) to verify syntax correctness, enforce read-only SELECT constraints, and confirm referenced tables exist before database execution."
    },
    database: {
      title: "DATABASE EXECUTION LAYER",
      tech: "PostgreSQL Connector",
      desc: "Executes the validated SQL query against PostgreSQL inside a safe, read-only transaction context with strict execution timeouts to prevent resource locking."
    },
    response: {
      title: "STRUCTURED RESPONSE LAYER",
      tech: "JSON Serialization & Metadata Assembly",
      desc: "Packages the raw database record set, execution duration, and query metadata into a predictable JSON API response for consuming client applications."
    }
  }
};
