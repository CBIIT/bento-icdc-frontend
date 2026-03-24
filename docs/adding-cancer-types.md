# Adding New Cancer Types to Human Relevance Visualization

## Overview
This document describes the **temporary process** for adding new cancer types to the Human Relevance visualization feature. This manual process will be replaced with backend normalization in the future.

## When to Add a New Cancer Type
When a study's `relevant_human_cancer` field contains a cancer type that is not yet supported in the visualization, it will be silently filtered out. You'll need to add support by following the steps below.

## Current Architecture (Temporary)

The system requires three manual updates in separate files:

### 1. Cancer Type Mapping (`src/pages/study/studyDetailView.tsx`)

**Location:** Lines 159-220, `CANCER_TYPE_TO_IMAGE_KEY` object

**Purpose:** Maps cancer type name variations (including typos) to canonical image keys

**Example:**
```typescript
const CANCER_TYPE_TO_IMAGE_KEY: Record<string, HumanRelevanceImageKey> = {
  // Lung cancer variations
  'Lung Cancer': 'lung',
  'Pulmonary Neoplasms': 'lung',  // ← Add all variations/aliases here
  lung: 'lung',
};
```

**What to add:**
- The exact cancer type string from the database
- Common variations or typos you find in the data
- A lowercase version for consistency

---

### 2. Image Configuration (`src/pages/study/studyDetailView.tsx`)

**Location:** Lines 99-154, `HUMAN_REL_IMAGES` object

**Purpose:** Defines SVG image URLs, alt text, and educational captions

**Example:**
```typescript
const HUMAN_REL_IMAGES = {
  lung: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_lung.svg',
    alt: 'Lung cancer illustration showing respiratory system in human and canine anatomy',
    caption: 'Educational text about comparative human/canine cancer biology...',
  },
};
```

**What to add:**
- **src**: URL to the SVG asset in the datacommons-assets repo
- **alt**: Accessible description of the image
- **caption**: Educational content about the cancer type (2-3 sentences)

**⚠️ Important:** Verify the SVG exists at the URL before deploying! If it doesn't exist:
1. Request the asset from the design/assets team
2. Use a similar cancer type's SVG as temporary fallback
3. Add a TODO comment explaining the temporary solution

---

### 3. Visualization Display Info (`src/pages/study/views/human-relevance/MultipleCancerTypesImage.tsx`)

**Location:** Lines 234-274, `CANCER_TYPE_DISPLAY_INFO` object

**Purpose:** Defines display names and hotspot positions on the human skeleton image

**Example:**
```typescript
const CANCER_TYPE_DISPLAY_INFO: Record<
  string,
  { name: string; position: { top: string; left: string } }
> = {
  lung: {
    name: 'Lung Cancer',  // Display name shown in legend
    position: { top: '30%', left: '49%' },  // Hotspot position on skeleton
  },
};
```

**What to add:**
- **name**: User-facing display name for the legend
- **position**: CSS positioning for the hotspot on the human skeleton image
  - `top`: Percentage from top (0-100%)
  - `left`: Percentage from left (0-100%)

**Position Guidelines:**
- Head/Brain: `top: '8%'`
- Neck/Thyroid: `top: '17%'`
- Chest/Breast/Lung: `top: '26-30%'`
- Abdomen/Bladder: `top: '50%'`
- Pelvis/Bone: `top: '70%'`
- Center horizontally: `left: '49-50%'`
- Offset left: `left: '44%'`, offset right: `left: '54-60%'`

---

## Step-by-Step Process

### 1. Identify Missing Cancer Type
Check the TSV source data or API response for cancer types not appearing in the UI.

### 2. Choose or Create Canonical Key
- Use lowercase, underscore-separated format (e.g., `lung`, `soft_tissue_sarcoma`)
- Be consistent with existing keys

### 3. Update All Three Locations
Make changes in the order listed above:
1. Add mapping variations to `CANCER_TYPE_TO_IMAGE_KEY`
2. Add image config to `HUMAN_REL_IMAGES`
3. Add display info to `CANCER_TYPE_DISPLAY_INFO`

### 4. Verify Asset Availability
```bash
curl -I https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_<cancer_type>.svg
```

If 404, use a fallback and document it with a TODO comment.

### 5. Test Locally
- Run the application
- Navigate to a study with the new cancer type
- Verify it appears in the legend
- Verify hotspot positioning on skeleton
- Verify detail panel displays correctly

### 6. Document Asset Request
If using a fallback SVG, create a ticket/issue requesting the proper asset from the design team.

---

## Example: Adding "Lung Cancer / Pulmonary Neoplasms"

See commit [hash] for the complete implementation of lung cancer support, including:
- Three mapping variations
- Temporary fallback to melanoma SVG
- Chest-level positioning at 30%
- Educational caption about pulmonary neoplasms

---

## Validation Script

Run the validation script to check for missing mappings:
```bash
npm run validate:cancer-types
```

This will:
- Fetch all cancer types from the API
- Check for missing mappings
- Report unmapped cancer types
- Verify SVG assets exist

---

## Future Improvements (Planned)

**Backend Normalization (Recommended)**
- Extend GraphQL schema with `CancerTypeMetadata` type
- Move all hardcoded mappings to database
- Include image URLs, positions, captions in API response
- Enable content editor updates without code changes

**Benefits:**
- No frontend code changes for new cancer types
- Single source of truth
- Content management without deployment
- Automated validation

---

## Questions or Issues?

If you encounter issues or have questions about adding cancer types:
1. Check existing mappings for similar cancer types
2. Review the Human Relevance visualization component code
3. Consult with the backend team about data quality issues
4. Request assets from the design team early in the process
