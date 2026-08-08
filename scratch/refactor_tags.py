import os

base_dir = r"c:\Users\Anubhav.Shubham\Documents\Codex\Patrika Matrimony App\PatrikaMatrimony\app\(auth)\onboarding"

files = [
    f for f in os.listdir(base_dir) if f.endswith(".tsx") and f.startswith("step")
] + ["welcome.tsx"]

def replace_closing_tag(content):
    # Find <PremiumCard ...>
    start_idx = content.find('<PremiumCard variant="glass" style={styles.glassCardContainer}>')
    if start_idx == -1:
        return content
        
    # the content starts here
    search_start = start_idx + len('<PremiumCard variant="glass" style={styles.glassCardContainer}>')
    
    # We will iterate and find <View and </View> to keep track of depth
    depth = 1
    idx = search_start
    
    while idx < len(content):
        # find next <View or </View
        next_open = content.find('<View', idx)
        next_close = content.find('</View>', idx)
        
        # if no more closes, we break
        if next_close == -1:
            break
            
        if next_open != -1 and next_open < next_close:
            # We found an opening tag before the next closing tag
            # Is it a self-closing view? <View ... />
            # We need to be careful. Let's just find <View> and </View> exactly, or <View ...>
            
            # check if it's self closing by looking for "/>" before ">"
            tag_end = content.find('>', next_open)
            if content[tag_end-1] == '/':
                # Self closing, doesn't increase depth
                idx = tag_end + 1
            else:
                depth += 1
                idx = tag_end + 1
        else:
            # We found a closing tag
            depth -= 1
            if depth == 0:
                # This is the matching closing tag!
                content = content[:next_close] + '</PremiumCard>' + content[next_close+len('</View>'):]
                break
            idx = next_close + len('</View>')
            
    return content


for f in files:
    path = os.path.join(base_dir, f)
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()

    new_content = replace_closing_tag(content)
    
    # Also fix welcome.tsx button
    if f == "welcome.tsx":
        if "<PremiumButton" not in new_content:
            new_content = new_content.replace(
                '<TouchableOpacity style={styles.primaryBtn} onPress={handleStartExploring} activeOpacity={0.88}>',
                '<PremiumButton title="Start Exploring Matches →" onPress={handleStartExploring} variant="primary" />\n{/* '
            )
            new_content = new_content.replace(
                '</TouchableOpacity>',
                ' */}'
            )
            # Add imports to welcome.tsx if missing
            if "PremiumButton" not in new_content:
                new_content = new_content.replace(
                    "import { useApp }",
                    "import PremiumButton from '../../../src/components/ui/PremiumButton';\nimport PremiumCard from '../../../src/components/ui/PremiumCard';\nimport { useApp }"
                )

    if new_content != content:
        with open(path, "w", encoding="utf-8") as file:
            file.write(new_content)

print("Done phase 2")
