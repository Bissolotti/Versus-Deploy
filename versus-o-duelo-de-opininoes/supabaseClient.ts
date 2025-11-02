// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// URL do seu projeto Supabase
const SUPABASE_URL = 'https://yacepzzieccdhiqgooyc.supabase.co';

// Chave anônima do Supabase
// Para pegar: vá em Settings > API > anon key no painel do Supabase
const SUPABASE_ANON_KEY = 'COLE_SUA_CHAVE_ANON_AQUI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);