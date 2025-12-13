module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "🚀 Features" },
            { type: "fix", section: "🔧 Fixes" },
            { type: "docs", section: "📝 Docs" },
            { type: "style", section: "💎 Styles" },
            { type: "refactor", section: "♻️ Refactor" },
            { type: "perf", section: "⚡ Performance" },
            { type: "test", section: "✅ Tests" },
            { type: "build", section: "🏗️ Build" },
            { type: "ci", section: "👷 CI" },
            { type: "chore", section: "🛠️ Chore" },
          ],
        },
        writerOpts: {
          transform: (commit) => {
            if (!commit.scope) {
              return { ...commit, scope: "general" };
            }
            return commit;
          },
          commitPartial: `* {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ([{{hash}}]({{@root.host}}/{{@root.owner}}/{{@root.repository}}/commit/{{hash}}))`,
        },
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        message: "chore(release): 🎉 v${nextRelease.version} version!",
      },
    ],
    "@semantic-release/github",
  ],
};
