export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
    favicon?: string;
    selected: boolean;
}

export interface JsonSchemaProperty {
    type: string;
    description?: string;
}

export interface JsonSchema {
    type: string;
    properties: Record<string, JsonSchemaProperty>;
    required?: string[];
}

export interface ScrapeResult {
    success: boolean;
    data?: any;
    error?: unknown;
}