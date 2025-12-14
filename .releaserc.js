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
            { type: "feat" },
            { type: "fix" },
            { type: "perf" },
            { type: "revert" },
            { type: "docs", hidden: true },
            { type: "style", hidden: true },
            { type: "refactor", hidden: true },
            { type: "test", hidden: true },
            { type: "build", hidden: true },
            { type: "ci", hidden: true },
            { type: "chore", hidden: true },
          ],
        },
        writerOpts: {
          groupBy: "typeTitle",
          transform: (commit, context) => {
            const significantTypes = ["feat", "fix", "perf", "revert"];

            if (!significantTypes.includes(commit.type)) {
              return null;
            }

            const typeToTitle = {
              feat: "✨ Новые возможности (feat)",
              fix: "🐛 Исправления (fix)",
              perf: "⚡ Оптимизация (perf)",
              revert: "⏪ Откаты (revert)",
            };

            const updatedCommit = {
              ...commit,
              scope: commit.scope || "general",
              typeTitle: typeToTitle[commit.type] || commit.type,
            };

            return updatedCommit;
          },
          commitPartial: `* {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ([{{hash}}]({{@root.host}}/{{@root.owner}}/{{@root.repository}}/commit/{{hash}}))\n`,
          headerPartial: `### {{typeTitle}}\n\n`,
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
