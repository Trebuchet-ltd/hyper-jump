def main():
    js_in = open('js/third-party/corelink.browser.lib.js', 'r')

    lines = []
    line = js_in.readline()

    bracket_count = 0
    quote_count = {"'": 0, '"': 0, "`": 0}

    while line:
        if "let" in line or "const" in line:
            for i in range(len(line)):
                if line[i] == '{':
                    bracket_count += 1
                elif line[i] == '}':
                    bracket_count -= 1
                elif line[i] in ["'", '"', "`"]:
                    quote_count[line[i]] += 1

                if bracket_count > 0 or any([quote_count[q] % 2 != 0 for q in quote_count]):
                    continue

                for word, replace in (("let", "var"), ("const", "var  ")):
                    if line[i:len(word)] == word:
                        line = line[:i] + replace + line[i + len(word):]
                        i += len(word)
        else:
            bracket_count += line.count("{") - line.count("}")

        lines.append(line)
        line = js_in.readline()
        quote_count["'"] = quote_count['"'] = 0

    js_out = open('output.js', 'w')
    js_out.writelines(lines)


if __name__ == "__main__":
    main()
