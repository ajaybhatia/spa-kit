# ==============================================================================
# spa-kit — Makefile
# ==============================================================================

PORT ?= 3000

.DEFAULT_GOAL := help

.PHONY: help
help: ## Print available targets
	@grep -E '^[a-zA-Z0-9_-]+:.*##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "}; {printf "  %-18s %s\n", $$1, $$2}'

.PHONY: dev
dev: ## Start Vite development server
	npm run dev

.PHONY: run
run: dev ## Alias for dev

.PHONY: install
install: ## Install dependencies (npm ci)
	npm ci

.PHONY: build
build: ## Typecheck and production build
	npm run build

.PHONY: lint
lint: ## Typecheck (tsc --noEmit)
	npm run lint

.PHONY: preview
preview: ## Preview production build locally
	npm run preview

.PHONY: clean
clean: ## Remove build artifacts
	npm run clean
