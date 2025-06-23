/**
 * API service for RecipeVault (browser version).
 * Uses fetch, localStorage, and DOM types.
 * @fileoverview Provides functions for authentication, user, and full recipe CRUD.
 */

/// <reference lib="dom" />

const API_BASE = "https://vscode-internal-7778-qa.qa01.cloud.kavia.ai:3001";

type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  owner?: string;
};

type RecipeCreate = Omit<Recipe, "id" | "owner">;
type RecipeUpdate = Partial<Omit<Recipe, "id" | "owner">>;
type UserProfile = { id: number; name: string; email: string };

const apiFetch = async (
  path: string,
  opts: any = {}, // fixed: avoid ESLint RequestInit no-undef error
  auth: boolean = false
): Promise<any> => {
  // eslint-disable-next-line no-undef
  const token = window.localStorage.getItem("token");
  const headers: any = { // fixed: avoid ESLint HeadersInit no-undef error
    "Content-Type": "application/json",
    ...opts.headers,
  };
  if (auth && token) headers["Authorization"] = `Bearer ${token}`;
  // eslint-disable-next-line no-undef
  const res = await window.fetch(API_BASE + path, {
    ...opts,
    headers,
    credentials: "include",
  });
  if (!res.ok) {
    let errorTxt = await res.text();
    throw new Error(`API Error: ${res.status} ${errorTxt}`);
  }
  return res.status === 204 ? null : res.json();
};

/**
 * Recipe API
 */

// PUBLIC_INTERFACE
export async function fetchRecipes(query = ""): Promise<Recipe[]> {
  let q = query ? `?search=${encodeURIComponent(query)}` : "";
  return await apiFetch(`/api/recipes/${q}`);
}

// PUBLIC_INTERFACE
export async function fetchRecipe(id: number): Promise<Recipe> {
  return await apiFetch(`/api/recipes/${id}/`);
}

// PUBLIC_INTERFACE
export async function createRecipe(data: RecipeCreate): Promise<Recipe> {
  return await apiFetch("/api/recipes/", {
    method: "POST",
    body: JSON.stringify(data),
  }, true);
}

// PUBLIC_INTERFACE
export async function updateRecipe(id: number, data: RecipeUpdate): Promise<Recipe> {
  return await apiFetch(`/api/recipes/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }, true);
}

// PUBLIC_INTERFACE
export async function deleteRecipe(id: number): Promise<void> {
  await apiFetch(`/api/recipes/${id}/`, {
    method: "DELETE",
  }, true);
}

/**
 * Auth API
 */

/**
 * Perform login and store token in browser localStorage.
 */
// PUBLIC_INTERFACE
export async function login(email: string, password: string): Promise<{ token: string }> {
  const resp = await apiFetch("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  // eslint-disable-next-line no-undef
  window.localStorage.setItem("token", resp.token);
  return resp;
}

/**
 * Perform registration and store returned token.
 */
// PUBLIC_INTERFACE
export async function register(name: string, email: string, password: string): Promise<{ token: string }> {
  const resp = await apiFetch("/api/auth/register/", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  // eslint-disable-next-line no-undef
  window.localStorage.setItem("token", resp.token);
  return resp;
}

/**
 * Remove login token
 */
// PUBLIC_INTERFACE
export function logout() {
  // eslint-disable-next-line no-undef
  window.localStorage.removeItem("token");
}

/**
 * User Profile API
 */

// PUBLIC_INTERFACE
export async function fetchProfile(): Promise<UserProfile> {
  return await apiFetch("/api/profile/", {}, true);
}

// PUBLIC_INTERFACE
export async function updateProfile(partial: Partial<UserProfile>): Promise<UserProfile> {
  return await apiFetch("/api/profile/", {
    method: "PATCH",
    body: JSON.stringify(partial),
  }, true);
}
