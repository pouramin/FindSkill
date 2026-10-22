
# Agent Skill Discovery Policy

## Mandatory skill discovery

Before starting any substantial development, design,
testing, or refactoring task:

1. Analyze the user's request.
2. Check which relevant skills are already installed.
3. If find-skills is available, read and use it to
   discover relevant specialized skills.
4. If no suitable skill is found, continue normally.
5. Never silently skip the skill-discovery step.

## Skill installation

If useful skills are discovered but not installed:

1. Recommend up to 3 relevant skills.
2. Explain their purpose and source.
3. Review obvious security risks.
4. Ask for user approval before installation.
5. Install approved skills only inside this project.
6. Never install skills globally.

## Skill usage

Before implementation:

1. Read the relevant installed SKILL.md files.
2. Apply their instructions where appropriate.
3. Do not apply irrelevant or conflicting guidance.
4. Follow the user's original project requirements.

## Reporting

At the end of each task, report:

- Which skills were discovered
- Which skills were installed
- Which skills were actually read and used
- Which files or decisions were influenced
- Any skills that were skipped and why

Never claim skill usage without execution evidence.
