# 🖼️ AI Agent Image Setup Guide

## 📁 Required Images

You need to add 3 friendly, professional images for your AI agents in the `/public/images/agents/` directory:

### Required Files:
- `doctor.jpg` - Friendly female doctor/medical professional
- `lawyer.jpg` - Professional female lawyer/legal expert  
- `psychiatrist.jpg` - Warm female therapist/counselor

## 🎯 Image Requirements

### **Technical Specs:**
- **Format**: JPG (preferred) or PNG
- **Size**: 500x500px minimum (square aspect ratio)
- **Quality**: High resolution, clear faces
- **File size**: Under 500KB each

### **Visual Style:**
- **Friendly & approachable** expressions
- **Professional attire** (medical coat, business suit, etc.)
- **Warm, welcoming** demeanor
- **From girl's/women's perspective** - relatable female professionals
- **Clean backgrounds** (white, office, or softly blurred)

## 🔍 Where to Find Images

### **Recommended Free Stock Photo Sites:**

1. **Unsplash** (unsplash.com)
   - Search: "female doctor smiling", "woman lawyer professional", "female therapist warm"
   - High quality, free for commercial use

2. **Pexels** (pexels.com)
   - Search: "professional woman doctor", "business woman lawyer", "counselor therapist"
   - Great selection of diverse professionals

3. **Pixabay** (pixabay.com)
   - Search: "doctor woman", "lawyer female", "psychiatrist therapist"
   - Free images with good variety

### **Specific Search Terms:**

#### For Doctor (`doctor.jpg`):
- "friendly female doctor smiling"
- "woman doctor stethoscope professional"
- "medical professional warm approachable"
- "healthcare worker female confident"

#### For Lawyer (`lawyer.jpg`):
- "professional businesswoman confident"
- "female lawyer business suit"
- "woman attorney professional portrait"
- "legal professional female expert"

#### For Psychiatrist (`psychiatrist.jpg`):
- "female therapist warm friendly"
- "counselor woman professional caring"
- "mental health professional female"
- "psychiatrist woman approachable"

## 📥 Download & Setup Instructions

### Step 1: Download Images
1. Visit one of the recommended sites
2. Search using the terms above
3. Download high-quality images (at least 500x500px)
4. Rename them exactly as: `doctor.jpg`, `lawyer.jpg`, `psychiatrist.jpg`

### Step 2: Process Images (Optional)
- Crop to square (1:1) aspect ratio
- Resize to 500x500px for optimal performance
- Ensure faces are clearly visible and centered

### Step 3: Add to Project
1. Place files in: `public/images/agents/`
   ```
   public/
     images/
       agents/
         doctor.jpg
         lawyer.jpg
         psychiatrist.jpg
   ```

### Step 4: Verify Setup
- Restart your development server (`npm run dev`)
- Navigate to the Chat interface
- You should see the images appear as circular avatars for each specialist

## 🎨 Fallback System

If images don't load, the system automatically shows:
- **Colored avatar initials** based on the specialist name
- **Purple** for Doctor
- **Teal** for Lawyer  
- **Pink** for Psychiatrist

## 🖼️ Example Image Sources Found

Based on web research, here are some good examples to look for:

### Doctor Images:
- Professional medical photos with stethoscope
- Warm, confident expressions
- Medical coat or professional healthcare attire
- Diverse representation available

### Lawyer Images:
- Business professional portraits
- Confident, approachable expressions
- Professional business attire
- Office or neutral backgrounds

### Psychiatrist Images:
- Therapist/counselor professional photos
- Warm, empathetic expressions
- Professional but approachable attire
- Calming, supportive demeanor

## ✅ Quality Checklist

Before adding images, ensure they have:
- [ ] Clear, friendly facial expression
- [ ] Professional appearance
- [ ] High image quality (not pixelated)
- [ ] Appropriate lighting
- [ ] Clean background
- [ ] Square aspect ratio
- [ ] Under 500KB file size
- [ ] Correct filename (`doctor.jpg`, `lawyer.jpg`, `psychiatrist.jpg`)

## 🚀 Result

Once set up, your AI agents will have:
- **Beautiful professional avatars** that build trust
- **Visual identity** for each specialist
- **Enhanced user experience** with personal connection
- **Consistent branding** across the application

The images will appear as circular avatars with subtle hover effects and status indicators in the chat interface!