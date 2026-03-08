// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

export type LlamaModel = {
	name: string;
	model: string;
	modified_at: string;
	size: string;
	digest: string;
	type: string;
	description: string;
	tags: string[];
	capabilities: string[];
	parameters: string;
	details: {
		parent_model: string;
		format: string;
		family: string;
		families: string[];
		parameter_size: string;
		quantization_level: string;
	};
};
