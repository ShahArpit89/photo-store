import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    // Required for @testing-library/react's automatic afterEach(cleanup) to
    // register — without this, DOM from one test leaks into the next.
    globals: true,
  },
});
