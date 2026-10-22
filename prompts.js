window.FINDSKILL_PROMPTS = [
  {
    "title": "Clean environment audit",
    "fa": "بررسی اولیه محیط",
    "info": "Read-only inventory before baseline",
    "faInfo": "بررسی مهارت‌ها قبل از آزمایش",
    "text": "Perform a READ-ONLY environment audit before this experiment.\n\n1. Identify the current workspace root.\n2. List all available agent skills, including project-level, parent-directory, and user-level skills.\n3. Clearly distinguish built-in system skills from externally installed skills.\n4. Check whether find-skills or any third-party frontend development skills are available.\n5. Identify any AGENTS.md files or inherited project instructions.\n\nDo not install, uninstall, modify, or delete anything.\n\nReport the exact skill names, locations, and scopes.\n\nThis experiment requires a clean baseline with no externally installed skills influencing the result."
  },
  {
    "title": "The original AERON website brief",
    "fa": "پرامپت اصلی ساخت فروشگاه آئرون",
    "info": "Identical original brief across builds",
    "faInfo": "درخواست ثابت و مشترک ساخت سایت",
    "text": "Build a complete, modern, premium e-commerce website for a fictional sneaker brand called AERON.\n\nPROJECT REQUIREMENTS\n\nTech stack:\n- React\n- TypeScript\n- Vite\n- Plain CSS\n\nDo not use paid APIs, prebuilt website templates, or a backend.\n\nDESIGN DIRECTION\n\nCreate a visually impressive, premium, editorial-style shopping experience.\n\nVisual style:\n- Minimalist and modern\n- Warm off-white and cream backgrounds\n- Dark charcoal typography\n- Orange accent color\n- Strong typography and visual hierarchy\n- Generous whitespace\n- Professional spacing and alignment\n- Smooth, subtle micro-interactions\n- Clean product photography or visual assets\n- Fully responsive layout\n\nAvoid generic dashboard aesthetics, cyberpunk designs, and excessive gradients.\n\nREQUIRED FEATURES\n\n1. Responsive navigation header\n2. Premium hero section with a strong headline and CTA\n3. Product collection with 6 sneaker products\n4. Product category filters\n5. Product cards with image, name, and price\n6. Product detail view\n7. Shoe size selection\n8. Functional add-to-cart button\n9. Shopping cart with quantity controls and total price\n10. Brand story section\n11. Newsletter section\n12. Professional footer\n13. Mobile navigation\n\nFUNCTIONAL REQUIREMENTS\n\n- All interactive features must actually work.\n- Cart and product filters must not be decorative.\n- Handle invalid or missing product selections.\n- Use accessible controls and visible focus states.\n- Respect reduced-motion preferences.\n- Avoid broken image placeholders.\n- Use reliable visual assets and provide fallbacks.\n- Do not implement fake payment processing.\n\nIMPLEMENTATION\n\nBuild the complete website inside the current project.\n\nInstall dependencies when necessary.\nRun the application and verify it builds successfully.\nFix implementation errors before finishing.\n\nAt the end, tell me how to preview the website.\n\nDo not ask unnecessary questions.\nMake reasonable design decisions and complete the task."
  },
  {
    "title": "Install find-skills locally",
    "fa": "نصب پروژه‌ای مهارت جست‌وجو",
    "info": "B and D setup",
    "faInfo": "آماده‌سازی تست جست‌وجو",
    "text": "I want to install exactly one agent skill for this experiment: find-skills by Vercel Labs.\n\nOfficial source:\nhttps://github.com/vercel-labs/skills/tree/main/skills/find-skills\n\nRaw skill definition:\nhttps://raw.githubusercontent.com/vercel-labs/skills/main/skills/find-skills/SKILL.md\n\nIMPORTANT INSTALLATION RULES:\n\n1. Install this skill ONLY in the current project.\n2. The target must be:\n   .agents/skills/find-skills/SKILL.md\n3. Obtain the official skill definition and preserve its contents.\n4. Do NOT install anything globally.\n5. Do NOT modify user-level Codex configuration.\n6. Do NOT install any other skills.\n7. Do NOT change the skill's original triggering description.\n8. Do NOT create additional AGENTS.md instructions.\n9. Do NOT start building the website.\n\nUse the current workspace's file operations for installation.\n\nVerify the installed skill directory and report the absolute path.\n\nStop after installation."
  },
  {
    "title": "Discover three specialist skills",
    "fa": "جست‌وجوی 3 مهارت تخصصی",
    "info": "Direct find-skills discovery",
    "faInfo": "درخواست مستقیم جست‌وجو",
    "text": "We are preparing to build a premium sneaker e-commerce website using React, TypeScript, Vite, and CSS.\n\nBefore building anything, use the installed find-skills skill to discover the 3 most relevant agent skills for this project.\n\nLook for skills covering:\n- Premium frontend UI/UX design\n- React and TypeScript best practices\n- Web accessibility, responsiveness, or quality\n\nFollow the discovery workflow defined in find-skills.\n\nFor each result, report:\n1. Exact skill name\n2. Author or source repository\n3. What the skill does\n4. Why it is useful for this website\n5. Installation source\n6. Any security or quality concerns\n\nPrefer reputable, well-maintained sources.\n\nDo not install anything yet.\nDo not create website files yet.\n\nWait for my approval."
  },
  {
    "title": "Approve and install the three selected skills",
    "fa": "تأیید و نصب 3 مهارت",
    "info": "Project-local install only",
    "faInfo": "بدون نصب سراسری",
    "text": "I approve all three recommended skills:\n\n1. frontend-design\n   Source: anthropics/skills\n\n2. vercel-react-best-practices\n   Source: vercel-labs/agent-skills\n\n3. web-design-guidelines\n   Source: vercel-labs/agent-skills\n\nInstall exactly these three skills.\n\nRequirements:\n- Install for Codex in the current project only.\n- Do not install globally.\n- Do not modify user-level Codex settings.\n- Preserve the original SKILL.md files and supporting resources.\n- Do not install additional skills.\n- Do not execute unrelated scripts.\n- Verify the installation paths and source repositories.\n- Record the installed source revisions if available.\n- Confirm all three skills are discoverable by Codex.\n\nDo not create or modify website code yet.\n\nStop after installation and provide a brief verification report."
  },
  {
    "title": "Verify real skill usage",
    "fa": "بررسی استفاده واقعی از مهارت‌ها",
    "info": "Execution evidence, not guesswork",
    "faInfo": "ردیابی فراخوانی‌های واقعی",
    "text": "Perform a STRICTLY READ-ONLY audit of the website-building task you just completed.\n\nI want to verify whether the installed agent skills were actually used during implementation.\n\nThe installed skills are:\n1. find-skills\n2. frontend-design\n3. vercel-react-best-practices\n4. web-design-guidelines\n\nFor EACH skill, report:\n\n1. Was the skill available when the task started?\n2. Was its SKILL.md actually opened or read?\n3. Was the skill explicitly invoked or automatically selected?\n4. At what stage of development was it used?\n5. Which specific instructions or guidelines were applied?\n6. Which files, components, or implementation decisions were influenced by it?\n7. What direct evidence from the execution history supports its usage?\n\nIMPORTANT:\n- Distinguish confirmed skill usage from assumptions.\n- Do not claim a skill was used just because it was installed.\n- Do not infer causation from code quality or design similarity.\n- If the skill was not used, explicitly say \"NOT USED\".\n- If usage cannot be verified, say \"NOT VERIFIABLE\".\n- Identify any OTHER skills used, including built-in or plugin-provided skills.\n\nProvide a summary table with:\nSkill | Available | Actually Read | Used | Evidence | Affected Files/Features\n\nDo not read or invoke any skills now.\nDo not run new skill-discovery searches.\nDo not modify files.\nDo not install anything.\nDo not run builds or tests.\n\nAudit only the original task's available execution history."
  },
  {
    "title": "Inspect automatic discovery in B",
    "fa": "بررسی کشف خودکار در آزمایش دوم",
    "info": "Focused evidence audit",
    "faInfo": "آیا ابزار خودش فراخوانی شد؟",
    "text": "Perform a strictly READ-ONLY audit of your previous website-building task.\n\nI want to determine whether the installed find-skills skill was automatically used.\n\nAnswer these questions:\n\n1. Was find-skills available when the task started?\n2. Did you actually invoke or read find-skills during implementation?\n3. Did you execute any skill-discovery commands?\n4. Did you search for additional skills?\n5. Were any additional skills installed or used?\n6. What evidence from the actual execution history supports your answers?\n\nImportant:\n- Do not invoke find-skills now.\n- Do not search for or install skills.\n- Do not modify any project files.\n- Do not infer skill usage merely from its availability.\n- If execution history is insufficient, say \"Not verifiable\".\n\nClearly distinguish confirmed actions from assumptions."
  },
  {
    "title": "Technical website verification",
    "fa": "بررسی فنی سایت ساخته‌شده",
    "info": "Repeated after each build",
    "faInfo": "ساخت، سبد خرید، فیلترها و دسترسی‌پذیری",
    "text": "Perform a read-only verification of the completed website.\n\nCheck:\n1. Whether the project builds successfully\n2. Which requested features were implemented\n3. Whether cart and category filtering work\n4. Responsive behavior\n5. Accessibility issues\n6. Missing assets or broken functionality\n\nReport any known issues.\n\nDo not modify or improve the website.\nDo not install any skills."
  },
  {
    "title": "Audit baseline's actual skill use",
    "fa": "بررسی مهارت‌های پروژه پایه",
    "info": "Check background plugin influences",
    "faInfo": "بررسی مهارت سایت‌ساز و بقیه مهارت‌ها",
    "text": "Perform a strictly READ-ONLY audit of the original website-building task.\n\nI need to verify whether any agent skills were actually used during implementation.\n\nSpecifically:\n\n1. Was the Sites skill available when the website task started?\n2. Did you read or invoke the Sites skill during implementation?\n3. Did you read any other SKILL.md files?\n4. Were any other skills actually invoked or used?\n5. Provide direct evidence from the original execution history.\n6. Distinguish skills that were available from skills that were actually used.\n\nDo not invoke any skills now.\nDo not modify project files.\nDo not install anything.\nDo not perform a new website evaluation.\n\nOnly report actions confirmed by the original task's execution history.\n\nIf evidence is unavailable, state \"Not verifiable\"."
  },
  {
    "title": "Force specialist-skill usage (additional test)",
    "fa": "استفاده مستقیم از 3 مهارت",
    "info": "Separate experiment, not automatic discovery",
    "faInfo": "آزمایش استفاده اجباری",
    "text": "Before building the website, explicitly read and apply these installed project-level skills:\n\n1. frontend-design\n2. vercel-react-best-practices\n3. web-design-guidelines\n\nUse frontend-design for visual direction, layout, typography, and interaction design.\n\nApply relevant vercel-react-best-practices guidance for React and TypeScript implementation. Ignore Next.js-specific rules that do not apply to Vite.\n\nApply web-design-guidelines during implementation and review the completed interface for accessibility, responsive behavior, and usability.\n\nDo not use find-skills to discover additional skills.\nDo not install any new skills.\n\nAfter reading the three skills, build the website according to the original AERON specification that follows.\n\n[PASTE THE EXACT ORIGINAL WEBSITE PROMPT HERE]\n\nAt the end, report which skill instructions were applied and provide evidence of reading each SKILL.md."
  },
  {
    "title": "AGENTS.md project discovery policy",
    "fa": "سیاست دائمی جست‌وجو در پروژه",
    "info": "Actual root policy from D-Agent-Instructions",
    "faInfo": "متن واقعی فایل منتشرشده",
    "text": "# Agent Skill Discovery Policy\n\n## Mandatory skill discovery\n\nBefore starting any substantial development, design,\ntesting, or refactoring task:\n\n1. Analyze the user's request.\n2. Check which relevant skills are already installed.\n3. If find-skills is available, read and use it to\n   discover relevant specialized skills.\n4. If no suitable skill is found, continue normally.\n5. Never silently skip the skill-discovery step.\n\n## Skill installation\n\nIf useful skills are discovered but not installed:\n\n1. Recommend up to 3 relevant skills.\n2. Explain their purpose and source.\n3. Review obvious security risks.\n4. Ask for user approval before installation.\n5. Install approved skills only inside this project.\n6. Never install skills globally.\n\n## Skill usage\n\nBefore implementation:\n\n1. Read the relevant installed SKILL.md files.\n2. Apply their instructions where appropriate.\n3. Do not apply irrelevant or conflicting guidance.\n4. Follow the user's original project requirements.\n\n## Reporting\n\nAt the end of each task, report:\n\n- Which skills were discovered\n- Which skills were installed\n- Which skills were actually read and used\n- Which files or decisions were influenced\n- Any skills that were skipped and why\n\nNever claim skill usage without execution evidence."
  },
  {
    "title": "Read-only final quality score",
    "fa": "گزارش امتیازدهی پایانی",
    "info": "Optional comparison rubric",
    "faInfo": "مقایسه با معیار مشترک",
    "text": "Perform a final read-only evaluation of this website.\n\nEvaluate the following categories from 0 to 5:\n\n1. Visual design quality\n2. Responsive mobile experience\n3. Functional completeness\n4. Accessibility and usability\n5. Code quality and build reliability\n\nExplain strengths and weaknesses for each category.\n\nInclude:\n- Build status\n- Number of functioning requested features\n- Broken or incomplete functionality\n- Any missing assets\n- Known accessibility issues\n- Skills used, only when verifiable\n\nDo not make any changes to the project.\nDo not optimize or repair anything."
  }
];
