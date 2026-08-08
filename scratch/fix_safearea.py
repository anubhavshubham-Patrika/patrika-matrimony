import os
import re

directory = 'c:/Users/Anubhav.Shubham/Documents/Codex/Patrika Matrimony App/PatrikaMatrimony/app'

for root, _, files in os.walk(directory):
    for file in files:
        if not file.endswith('.tsx'):
            continue
            
        filepath = os.path.join(root, file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        def replacer(match):
            imports = match.group(1).split(',')
            imports = [i.strip() for i in imports if i.strip()]
            if 'SafeAreaView' in imports:
                imports.remove('SafeAreaView')
                if not imports:
                    return "import { SafeAreaView } from 'react-native-safe-area-context';"
                else:
                    imports_str = ', '.join(imports)
                    return f"import {{ {imports_str} }} from 'react-native';\nimport {{ SafeAreaView }} from 'react-native-safe-area-context';"
            return match.group(0)

        new_content = re.sub(r'import\s+\{([^}]+)\}\s+from\s+[\'"]react-native[\'"];', replacer, content)
        
        if new_content != content:
            print(f"Fixed {filepath}")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
