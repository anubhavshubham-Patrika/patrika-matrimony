import os
import re

base_dir = r"c:\Users\Anubhav.Shubham\Documents\Codex\Patrika Matrimony App\PatrikaMatrimony\app\(auth)\onboarding"

# List of files to process
files = [
    f for f in os.listdir(base_dir) if f.endswith(".tsx") and f.startswith("step")
] + ["welcome.tsx"]

for f in files:
    path = os.path.join(base_dir, f)
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()

    # 1. Imports
    if "import PremiumButton" not in content:
        # insert after import { View, ...
        content = re.sub(
            r"(import React.*?;\n)",
            r"\1import PremiumButton from '../../../src/components/ui/PremiumButton';\nimport PremiumCard from '../../../src/components/ui/PremiumCard';\n",
            content,
            count=1
        )
    
    # 2. Replace Footer button
    # Look for a touchable opacity inside footerContainer
    # It might be slightly different in each file
    content = re.sub(
        r'<TouchableOpacity\s+style=\{[^}]*styles\.continueBtn[^}]*\}\s+onPress=\{([^}]+)\}\s+disabled=\{([^}]+)\}.*?>\s*<Text.*?>([^<]+)</Text>\s*</TouchableOpacity>',
        r'<PremiumButton title="\3" onPress={\1} disabled={\2} variant="primary" />',
        content,
        flags=re.DOTALL
    )
    
    # Some buttons don't have disabled props or have it differently
    content = re.sub(
        r'<TouchableOpacity\s+style=\{[^}]*styles\.(continueBtn|primaryBtn)[^}]*\}\s+onPress=\{([^}]+)\}.*?>\s*<Text.*?>([^<]+)</Text>\s*</TouchableOpacity>',
        r'<PremiumButton title="\3" onPress={\2} variant="primary" />',
        content,
        flags=re.DOTALL
    )

    # 3. Replace glassCardContainer
    content = content.replace(
        '<View style={styles.glassCardContainer}>',
        '<PremiumCard variant="glass" style={styles.glassCardContainer}>'
    )
    
    # We need to replace the closing tag of glassCardContainer. This is hard with regex because of nested views.
    # Actually, we can just replace the definition in styles and use replace with a careful regex.
    # For now, let's just do a regex that finds the end of glassCardContainer if possible, 
    # but the easiest way is to use a stack parser or just do it manually for the closing tag.
    # Let's write a simple nested tag parser to find the corresponding </View> and replace it.
    
    # 4. Progress text "Step X of 13" -> "0X / 13"
    content = re.sub(r'Step (\d+) of 13', lambda m: f"{int(m.group(1)):02d} / 13", content)
    
    # 5. Colors
    content = content.replace('#0F2E2B', '#183B82') # Colors.primary
    content = content.replace('#0D9488', '#4169D8') # Colors.primaryLight
    content = content.replace('rgba(13, 148, 136, 0.12)', 'rgba(65, 105, 216, 0.12)')
    content = content.replace('rgba(15, 46, 43, 0.12)', 'rgba(24, 59, 130, 0.12)')
    content = content.replace('rgba(15, 46, 43, 0.08)', 'rgba(24, 59, 130, 0.08)')
    content = content.replace('rgba(15, 46, 43, 0.25)', 'rgba(24, 59, 130, 0.25)')
    content = content.replace('rgba(235, 247, 245, 0.92)', 'rgba(243, 247, 255, 0.92)')
    content = content.replace('rgba(15, 46, 43, 0.1)', 'rgba(24, 59, 130, 0.1)')
    content = content.replace('rgba(15, 46, 43, 0.2)', 'rgba(24, 59, 130, 0.2)')

    with open(path, "w", encoding="utf-8") as file:
        file.write(content)

print("Done phase 1")
