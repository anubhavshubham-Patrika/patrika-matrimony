import os
import re

base_dir = r"c:\Users\Anubhav.Shubham\Documents\Codex\Patrika Matrimony App\PatrikaMatrimony\app\(auth)\onboarding"
files = [f for f in os.listdir(base_dir) if f.endswith(".tsx") and f.startswith("step")] + ["welcome.tsx"]

for f in files:
    path = os.path.join(base_dir, f)
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()

    # ensure Typography is imported
    if "import { Typography" not in content and "fontFamily: 'serif'" in content:
        content = re.sub(
            r"import PremiumCard from '(.*?)';",
            r"import PremiumCard from '\1';\nimport { Typography } from '../../../src/constants/theme';",
            content
        )
    
    content = content.replace("fontFamily: 'serif'", "fontFamily: Typography.fontFamily.serif")

    with open(path, "w", encoding="utf-8") as file:
        file.write(content)

print("Phase 3 done")
