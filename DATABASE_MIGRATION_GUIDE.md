# Deprecated Database Migration Guide

This guide referenced legacy SQL scripts that no longer exist after the Supabase client centralization. The migration now lives in dedicated SQL files under `database/` and the web app interacts with them via the shared `js/supabase-client.js`. Keeping the full walkthrough here risked misleading future contributors, so the detailed instructions have been removed. Refer to the current SQL files and inline code comments for the up-to-date flow.
