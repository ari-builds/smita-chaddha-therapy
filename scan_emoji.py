import re, sys, unicodedata

BLOCK = ("EMOJI","ARROW","STAR","HEART","SPARKLE","CHECK","BULLET","SUN","MOON",
         "LEAF","DASH","QUOTATION","WAVY","GLOBE","SCROLL","WRENCH","PUSHPIN",
         "SPIRAL","CHECKER","BLACK","WHITE","HEAVY","DIAMOND","NOTE","PENCIL",
         "CROSS","TRIANGLE","SQUARE","CIRCLE","FLAG","HOURGLASS","WARNING","INFO",
         "QUESTION","EXCLAMATION","PLUS","MINUS","COPYRIGHT","REGISTERED","TRADE")

def scan(path):
    s = open(path, encoding="utf-8").read()
    hits = []
    for ch in s:
        cp = ord(ch)
        if cp <= 0x2100:
            continue
        try:
            n = unicodedata.name(ch)
        except ValueError:
            n = "UNNAMED"
        if any(k in n for k in BLOCK):
            hits.append((hex(cp), n))
    print(f"--- {path}")
    if hits:
        seen = set()
        for h, n in hits:
            if h not in seen:
                seen.add(h)
                print(f"    {h}  {n}")
        print(f"    TOTAL: {len(hits)}")
    else:
        print("    CLEAN - no emoji or symbol glyphs")
    nonascii = len(re.findall(r"[^\x00-\x7F]", s))
    print(f"    non-ascii chars (accented letters etc): {nonascii}")

for p in sys.argv[1:]:
    try:
        scan(p)
    except Exception as e:
        print(f"--- {p}\n    ERROR: {e}")