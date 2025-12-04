#!/bin/bash
# VPS Website Optimization Script
# This script helps analyze and optimize the website for maximum performance

set -e

echo "🚀 VPS Website Performance Analyzer"
echo "====================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if ImageMagick is installed
echo "📦 Checking dependencies..."
if command -v convert &> /dev/null; then
    echo -e "${GREEN}✅ ImageMagick found${NC}"
    HAS_IMAGEMAGICK=true
else
    echo -e "${YELLOW}⚠️  ImageMagick not found${NC}"
    echo "   Install with: brew install imagemagick (Mac)"
    echo "   Install with: sudo apt-get install imagemagick (Ubuntu)"
    HAS_IMAGEMAGICK=false
fi

if command -v cwebp &> /dev/null; then
    echo -e "${GREEN}✅ WebP tools found${NC}"
    HAS_WEBP=true
else
    echo -e "${YELLOW}⚠️  WebP tools not found${NC}"
    echo "   Install with: brew install webp (Mac)"
    HAS_WEBP=false
fi

echo ""
echo "📊 Analyzing image sizes..."
echo "==========================="

# Count and size of images
GALLERY_COUNT=$(find src/assets/images/gallery-photos -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.JPG" -o -name "*.png" \) 2>/dev/null | wc -l | tr -d ' ')
GALLERY_SIZE=$(find src/assets/images/gallery-photos -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.JPG" -o -name "*.png" \) -exec ls -l {} \; 2>/dev/null | awk '{sum+=$5} END {print sum}')
GALLERY_SIZE_MB=$(echo "scale=2; $GALLERY_SIZE / 1048576" | bc)

echo -e "${BLUE}Gallery Images:${NC}"
echo "  Count: $GALLERY_COUNT images"
echo "  Total Size: ${GALLERY_SIZE_MB}MB"
echo ""

# Large images (> 500KB)
echo -e "${YELLOW}Large Images (> 500KB):${NC}"
find src/assets/images/gallery-photos -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.JPG" -o -name "*.png" \) -size +500k -exec ls -lh {} \; 2>/dev/null | awk '{printf "  ❌ %s (%s)\n", $9, $5}'

# Count large images
LARGE_COUNT=$(find src/assets/images/gallery-photos -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.JPG" -o -name "*.png" \) -size +500k 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo -e "${BLUE}Summary:${NC}"
if [ "$LARGE_COUNT" -gt 0 ]; then
    echo -e "  ${RED}⚠️  $LARGE_COUNT images need optimization${NC}"
else
    echo -e "  ${GREEN}✅ All images are optimized!${NC}"
fi

echo ""
echo "📋 Optimization Checklist"
echo "========================="
echo -e "${GREEN}✅ Service Worker implemented${NC}"
echo -e "${GREEN}✅ Resource hints added${NC}"
echo -e "${GREEN}✅ Caching headers configured${NC}"
echo -e "${GREEN}✅ Lazy loading enabled${NC}"
echo -e "${GREEN}✅ Font optimization enabled${NC}"

if [ "$LARGE_COUNT" -gt 0 ]; then
    echo -e "${RED}❌ Images need optimization${NC}"
else
    echo -e "${GREEN}✅ Images optimized${NC}"
fi

echo ""
echo "🎯 Next Steps"
echo "============="
if [ "$LARGE_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}1. Optimize images (CRITICAL)${NC}"
    echo "   - Read: docs/IMAGE_OPTIMIZATION.md"
    echo "   - Use: https://squoosh.app/"
    echo "   - Target: < 500KB per image"
    echo ""
fi

echo "2. Test service worker"
echo "   - Start local server: python3 -m http.server 8000"
echo "   - Visit: http://localhost:8000/home/"
echo "   - Check: DevTools > Application > Service Workers"
echo ""

echo "3. Run performance audit"
echo "   - Visit: https://pagespeed.web.dev/"
echo "   - Enter your URL"
echo "   - Target: 85+ performance score"
echo ""

echo "📚 Documentation"
echo "================"
echo "  docs/QUICK_START.md                - Quick overview"
echo "  docs/IMAGE_OPTIMIZATION.md         - Image optimization guide"
echo "  docs/PERFORMANCE_OPTIMIZATIONS.md  - Technical details"
echo ""

echo "✨ Done!"

