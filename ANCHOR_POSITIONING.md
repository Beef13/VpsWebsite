# Anchor Link Scroll Positioning Guide

This guide explains how to control where anchor links (`#about`, `#contact`) scroll to on the page.

## Current Setup

Your site uses CSS `scroll-margin-top` and `scroll-padding-top` to offset anchor links, accounting for the fixed header (70px tall) plus extra breathing room.

## Where to Edit

Open: `/src/css/style.css`

### Global Setting (All Anchors)

**Lines 6-8:**
```css
html {
    scroll-behavior: smooth;
    scroll-padding-top: 90px; /* Offset for fixed header + extra space */
}
```

**How to adjust:**
- **Increase value** (e.g., `120px`) = Scrolls HIGHER on page (more space above section)
- **Decrease value** (e.g., `60px`) = Scrolls LOWER on page (less space above section)
- Affects ALL anchor links site-wide

### Individual Section Controls

**About Section (Lines 1145-1148):**
```css
#about {
    scroll-margin-top: 90px; /* Adjust this value to position higher or lower */
}
```

**Contact Section (Lines 586-589):**
```css
#contact {
    scroll-margin-top: 90px; /* Adjust this value to position higher or lower */
}
```

**How to adjust:**
- Change the pixel value for each section independently
- Example: Make "About" scroll higher: `scroll-margin-top: 120px;`
- Example: Make "Contact" scroll lower: `scroll-margin-top: 60px;`

## Understanding the Values

### Current Values:
- **Fixed header height:** 70px
- **Global scroll offset:** 90px (header + 20px breathing room)
- **Section offsets:** 90px each

### Recommended Values:
- **Minimum:** 70px (just clears the header)
- **Comfortable:** 90-100px (header + small margin)
- **Spacious:** 120-150px (header + large margin)

## Visual Guide

```
                     ┌─────────────────────────┐
                     │   Fixed Header (70px)   │
┌──────────────────┼─────────────────────────┼─────────────────────┐
│ scroll-margin:   │ ← Extra space (20px) → │                      │
│ 90px             └─────────────────────────┘                      │
│                  ┌───────────────────────────────────────────┐   │
│                  │                                             │   │
│                  │   Section Content Starts Here              │   │
│                  │   (Your "About Us" or "Contact" section)   │   │
│                  │                                             │   │
│                  └───────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────┘
```

## Testing Your Changes

1. Save your CSS file after making changes
2. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Click the "About" or "Contact" links in the header
4. Check if the scroll position feels right
5. Adjust values and repeat

## Examples

### Make "About" scroll much higher on the page:
```css
#about {
    scroll-margin-top: 150px; /* More space above */
}
```

### Make "Contact" align perfectly with header:
```css
#contact {
    scroll-margin-top: 70px; /* Exact header height */
}
```

### Different values for each section:
```css
#about {
    scroll-margin-top: 120px; /* About gets more space */
}

#contact {
    scroll-margin-top: 80px; /* Contact gets less space */
}
```

## Mobile Considerations

The same values work for mobile, but you might want to adjust them for smaller screens:

```css
@media screen and (max-width: 768px) {
    html {
        scroll-padding-top: 80px; /* Slightly less on mobile */
    }
    
    #about,
    #contact {
        scroll-margin-top: 80px;
    }
}
```

## Quick Reference

| Value | Effect | Use Case |
|-------|--------|----------|
| `60px` | Tight spacing | Minimal offset, section just below header |
| `70px` | Header only | Content starts right at header bottom |
| `90px` | Comfortable | Current setting - balanced look |
| `120px` | Spacious | More breathing room above content |
| `150px+` | Very spacious | Maximum visibility of section start |

## Need Help?

- Current setup: Lines 6-8 (global), 586-589 (contact), 1145-1148 (about)
- All values are in pixels (`px`)
- Changes take effect immediately after page refresh
- You can use different values for different sections

