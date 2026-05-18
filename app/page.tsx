'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function TheBeaksSneakPeeks() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1/1 Revealed
  const oneOfOnes = [
    { url: "https://pbs.twimg.com/media/HIMZOqvW0AArEP0.jpg", title: "First 1/1 Revealed", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/HISXDI8XkAALUPv.jpg", title: "Second 1/1 Revealed", artist: "@DKashtalyan" },
  ];

  // Approved Community Arts Gallery
  const communityGallery = [
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/0174ddf5-be45-4252-93fc-062b3886642a/cbcdf0f9-ef94-4217-a915-c71f392d4104.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMDE3NGRkZjUtYmU0NS00MjUyLTkzZmMtMDYyYjM4ODY2NDJhL2NiY2RmMGY5LWVmOTQtNDIxNy1hOTE1LWM3MWYzOTJkNDEwNC5naWYiLCJpYXQiOjE3NzkxMDEwOTgsImV4cCI6MTc3OTE0NDI5OH0.iYTkXkRQPWnIPD98tydEla16hAez9rUCO7MmxdTJZ8s", title: "Pixel Beak.gif", artist: "@blurnplay" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/57a14a3b-f290-4959-a72f-6e86c0ca9b58/adac113f-5ffe-4134-88f4-e8482985526e.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNTdhMTRhM2ItZjI5MC00OTU5LWE3MmYtNmU4NmMwY2E5YjU4L2FkYWMxMTNmLTVmZmUtNDEzNC04OGY0LWU4NDgyOTg1NTI2ZS5naWYiLCJpYXQiOjE3NzkxMDEwOTgsImV4cCI6MTc3OTE0NDI5OH0.Kp33t78GA8Ig_W36f2_-eVytNG0GahtpUzntqUhA5gg", title: "steampunk Pixel Beak", artist: "@Natt_369_" },
    { url: "https://pbs.twimg.com/media/HH1lUv7WkAEn2se?format=jpg&name=360x360", title: "Favorite Beak with Combination of unused tiles", artist: "@erfann5427" },
    { url: "https://pbs.twimg.com/media/HIDQ2qVagAAXW8o?format=jpg&name=360x360", title: "A Leg Gives Beak Life", artist: "@dhirajleg" },
    { url: "https://pbs.twimg.com/media/HID6777W0AAOzg8?format=jpg&name=large", title: "The Steamforged Beak", artist: "@batt004" },
    { url: "https://pbs.twimg.com/media/HIEmxVCX0AAV-2J?format=jpg&name=medium", title: "Geisha", artist: "@Dejiiszn" },
    { url: "https://pbs.twimg.com/media/HIFnqO2W4AAWrr_?format=jpg&name=4096x4096", title: "The Creation of Beaks", artist: "@BitArtixt" },
    { url: "https://pbs.twimg.com/media/HIDgNpZXMAAbMPP?format=jpg&name=medium", title: "The Beak Planet", artist: "@saintbrx" },
    { url: "https://pbs.twimg.com/media/HIHSLjhaEAAYUr4?format=jpg&name=large", title: "Untitled", artist: "@katongbems" },
    { url: "https://pbs.twimg.com/media/HIHP7L-XQAAbd21?format=jpg&name=large", title: "Nobody gave us a stage so we built ours", artist: "@valkiz_jr" },
    { url: "https://pbs.twimg.com/media/HIFeI9caAAAKsTP?format=jpg&name=large", title: "Folded Beak", artist: "@Saoirseyey" },
    { url: "https://pbs.twimg.com/media/HIHnI7oWwAEv2p3?format=jpg&name=large", title: "Hybrid beak", artist: "@Pauline_Fathima" },
    { url: "https://pbs.twimg.com/media/HIIOljqbcAAD7jK?format=jpg&name=large", title: "Untitled", artist: "@doinkpTT" },
    { url: "https://pbs.twimg.com/media/HImokcXWEAE_CAX?format=jpg&name=large", title: "embroidered case", artist: "@amberw3b" },
    { url: "https://pbs.twimg.com/media/HIMF-frWMAAN-k-?format=jpg&name=4096x4096", title: "AUGUSTE RODIN IN FLOW STATE", artist: "@King____nft" },
    { url: "https://pbs.twimg.com/media/HIMWHtJWQAAAVFv?format=jpg&name=large", title: "ANIME BEAK", artist: "@Uchenna603" },
    { url: "https://pbs.twimg.com/media/HINC4FqaoAADkBP?format=jpg&name=medium", title: "Murakami Beak", artist: "@Yizzz_web3" },
    { url: "https://pbs.twimg.com/media/HINUzrlXcAA0vBz?format=jpg&name=4096x4096", title: "PicaBeaks", artist: "@AVolcans" },
    { url: "https://pbs.twimg.com/media/HII4DvCXEAAc6w2?format=jpg&name=4096x4096", title: "Volcano beak", artist: "@0x_Castar" },
    { url: "https://pbs.twimg.com/media/HIOIUUfW0AAjZ9h?format=jpg&name=medium", title: "The Beaks in Armenia", artist: "@ccshark64" },
    { url: "https://pbs.twimg.com/media/HIOJJ49WkAEMRtz?format=jpg&name=large", title: "Celestial Veil", artist: "@OluwadamisiV" },
    { url: "https://pbs.twimg.com/media/HIRl2gWX0AAiYtE?format=jpg&name=medium", title: "astronaut beak", artist: "@BhellowO" },
    { url: "https://pbs.twimg.com/media/HILemVHWYAADZT9?format=jpg&name=large", title: "Rapstar Beaks", artist: "@Iam__robert" },
    { url: "https://pbs.twimg.com/media/HIOXdG8XAAAFMBn?format=jpg&name=large", title: "BREAK FREE", artist: "@0xJBoy" },
    { url: "https://pbs.twimg.com/media/HIROCDfXYAABvpR?format=jpg&name=large", title: "Quilling for Beaks ❤️", artist: "@amiirkaya" },
    { url: "https://pbs.twimg.com/media/HIRnREyXIAAvE48?format=jpg&name=4096x4096", title: "BEAKS IN WONDERLAND", artist: "@Sirmee_kay" },
    { url: "https://pbs.twimg.com/media/HIRv2wkWUAIsW3T?format=jpg&name=large", title: "Every Roll start somewhere.", artist: "@lay_con2" },
    { url: "https://pbs.twimg.com/media/HISNHPAWUAEr9cV?format=jpg&name=large", title: "Geometric beak", artist: "@mr_wayne_2" },
    { url: "https://pbs.twimg.com/media/HIS5SAwWIAA0mzH?format=jpg&name=large", title: "Baroque Beak Masquerade", artist: "@fantasy_prone" },
    { url: "https://pbs.twimg.com/media/HITHoTPXcAAtw6p?format=jpg&name=large", title: "THE GRAND VESSEL", artist: "@Calopo_" },
    { url: "https://pbs.twimg.com/media/HITPBlWXsAAfyZF?format=jpg&name=4096x4096", title: "Mutant beak", artist: "@q2darvo" },
    { url: "https://pbs.twimg.com/media/HITnNihW0AAY-bG?format=jpg&name=large", title: "Twani zuka", artist: "@verah_tee" },
    { url: "https://pbs.twimg.com/media/HIUFyVyXkAAxWsd?format=jpg&name=large", title: "Dreamlike feel", artist: "@JSmithGuru" },
    { url: "https://pbs.twimg.com/media/HISW62Na8AISaaB?format=jpg&name=large", title: "Witch's beak", artist: "@lucas950825" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/c7bf8415-b7e1-47e9-b30a-242b80d880f3/1fdfc725-86c5-417a-9c3e-8f945f97330c.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvYzdiZjg0MTUtYjdlMS00N2U5LWIzMGEtMjQyYjgwZDg4MGYzLzFmZGZjNzI1LTg2YzUtNDE3YS05YzNlLThmOTQ1Zjk3MzMwYy5qcGVnIiwiaWF0IjoxNzc5MTAxMDk4LCJleHAiOjE3NzkxNDQyOTh9.C-X7xAliG_fZorwRVxfdK7FVPJE48GrO4NPyjctqBqQ", title: "Heist", artist: "@T0kenPrince" },
    { url: "https://pbs.twimg.com/media/HIRzviQaYAANeee?format=jpg&name=large", title: "Soirée", artist: "@MynddNFT" },
    { url: "https://pbs.twimg.com/media/HIWJeUKbgAE3Kx5?format=jpg&name=large", title: "Surreal Beaks", artist: "@tbtphaha" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/f1269b6e-2f75-49f3-865a-7bee6dd2dcf9/eb90b47d-c5ae-4f34-bee3-ef5543cf0ba7.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvZjEyNjliNmUtMmY3NS00OWYzLTg2NWEtN2JlZTZkZDJkY2Y5L2ViOTBiNDdkLWM1YWUtNGYzNC1iZWUzLWVmNTU0M2NmMGJhNy5naWYiLCJpYXQiOjE3NzkxMDEwOTgsImV4cCI6MTc3OTE0NDI5OH0.PF2YWRev9UO0wG3d7DhUosDE1JsN9nJK8N8nW-RTzeg", title: "The Beak Atelier", artist: "@maraoi_" },
    { url: "https://pbs.twimg.com/media/HITa_0tWUAEgs__?format=jpg&name=large", title: "Beaks Piece", artist: "@charlessel15864" },
    { url: "https://pbs.twimg.com/media/HIWjEdWWcAAuAjK?format=jpg&name=medium", title: "3D blender art", artist: "@yourboyjozy" },
    { url: "https://pbs.twimg.com/media/HIT6k6uX0AAQqha?format=jpg&name=4096x4096", title: "Chrome metallic beak", artist: "@Beebs1S" },
    { url: "https://pbs.twimg.com/media/HIWwo98aQAAqZca?format=jpg&name=4096x4096", title: "Ancient Statue Of The Beak", artist: "@JinxLockIn" },
    { url: "https://pbs.twimg.com/media/HIW_DyYbQAAcBXo?format=jpg&name=4096x4096", title: "Untitled", artist: "@_naina_20" },
    { url: "https://pbs.twimg.com/media/HIW7_OubQAASb2H?format=jpg&name=4096x4096", title: "Lake of goodness", artist: "@rohitisright" },
    { url: "https://pbs.twimg.com/media/HIXYfXyXkAA114N?format=jpg&name=large", title: "CyberBeak", artist: "@Thee_Trailz" },
    { url: "https://pbs.twimg.com/media/HIXe3WlXEAAOxsS?format=jpg&name=medium", title: "Ancient Beak", artist: "@velori_" },
    { url: "https://pbs.twimg.com/media/HIXU0XhbsAAGonX?format=jpg&name=large", title: "Passions With Beaks", artist: "@envyonthetop" },
    { url: "https://pbs.twimg.com/media/HIXg-CNWUAA3QuU?format=jpg&name=large", title: "Before She Reached Down", artist: "@DaniiOnChain" },
    { url: "https://pbs.twimg.com/media/HIXlkNSWMAACuBx?format=jpg&name=large", title: "Cosmo Beak - the space ranger", artist: "@Spencer_de_Noob" },
    { url: "https://pbs.twimg.com/media/HIXmtEqWMAEWC6R?format=jpg&name=large", title: "“THE EVOLVING PHASE”", artist: "@heisjohnmayor" },
    { url: "https://pbs.twimg.com/media/HIljBtma8AAeKWG?format=jpg&name=large", title: "Future of Beak", artist: "@fauzanbunz" },
    { url: "https://pbs.twimg.com/media/HIYWZRTWwAA-N7Q?format=jpg&name=large", title: "tropical paradise", artist: "@DanielSam3031" },
    { url: "https://pbs.twimg.com/media/HIYhimfWMAESNj4?format=jpg&name=large", title: "Lazarus Beak", artist: "@adebisi_olami" },
    { url: "https://pbs.twimg.com/media/HIYgYO1WgAAQIdD?format=jpg&name=large", title: "Kingpin Beak", artist: "@Nickle_Xin" },
    { url: "https://pbs.twimg.com/media/HISpFSGXUAAT0ai?format=jpg&name=large", title: "tonydrawsart", artist: "@Tonyy_Draws" },
    { url: "https://pbs.twimg.com/media/HIY-aJ4aEAAzalZ?format=jpg&name=4096x4096", title: "THE GOLDEN BEAK", artist: "@Tanjiro3060" },
    { url: "https://pbs.twimg.com/media/HIapvBKa8AESlbl?format=jpg&name=large", title: "B Beaks", artist: "@0xjamp" },
    { url: "https://pbs.twimg.com/media/HIa2mdHbIAAzWXS?format=jpg&name=4096x4096", title: "The Beaks collage", artist: "@emptystdotcom" }
  ];

  // DIMA'S Archive
  const dimaArchive = [
    { url: "https://pbs.twimg.com/media/FATAf-CWYAY1Z5X?format=jpg&name=medium", title: "Dima's Archive 1", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/E_OhViPXsAA7ggv?format=jpg&name=4096x4096", title: "Dima's Archive 2", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/E_LDGsQXIAAuPuu?format=jpg&name=4096x4096", title: "Dima's Archive 3", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FBV69YyXIAcsONa?format=jpg&name=medium", title: "Dima's Archive 4", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FCiz-zLXsAUEDmO?format=jpg&name=large", title: "Dima's Archive 5", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FDOEWdhXEAQ1cOx?format=jpg&name=4096x4096", title: "Dima's Archive 6", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FFldHy6WYAErvse?format=jpg&name=large", title: "Dima's Archive 7", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FGqnqFAXwBAjQAw?format=jpg&name=4096x4096", title: "Dima's Archive 8", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FJE_SZpWYAYO4hm?format=jpg&name=4096x4096", title: "Dima's Archive 9", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FJOHJVWXsAE664q?format=jpg&name=4096x4096", title: "Dima's Archive 10", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FJOouhkXsAE7g5t?format=jpg&name=4096x4096", title: "Dima's Archive 11", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FKdM18BXIAcncFR?format=jpg&name=large", title: "Dima's Archive 12", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FP6iBcXXsAQlzV3?format=jpg&name=large", title: "Dima's Archive 13", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FRvAqrXWQAIOhlw?format=jpg&name=4096x4096", title: "Dima's Archive 14", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FR2rSgeXIAAdLeJ?format=jpg&name=4096x4096", title: "Dima's Archive 15", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/FV1NPIAWIAEhTdD?format=jpg&name=medium", title: "Dima's Archive 16", artist: "@DKashtalyan" }
  ];

  const openModal = (item: any, index: number, galleryType: string) => {
    setSelectedImage({ ...item, galleryType });
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const goToNext = () => {
    if (!selectedImage) return;
    let gallery;
    if (selectedImage.galleryType === 'oneOfOnes') gallery = oneOfOnes;
    else if (selectedImage.galleryType === 'dima') gallery = dimaArchive;
    else gallery = communityGallery;

    const nextIndex = (currentIndex + 1) % gallery.length;
    setCurrentIndex(nextIndex);
    setSelectedImage({ ...gallery[nextIndex], galleryType: selectedImage.galleryType });
  };

  const goToPrevious = () => {
    if (!selectedImage) return;
    let gallery;
    if (selectedImage.galleryType === 'oneOfOnes') gallery = oneOfOnes;
    else if (selectedImage.galleryType === 'dima') gallery = dimaArchive;
    else gallery = communityGallery;

    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setCurrentIndex(prevIndex);
    setSelectedImage({ ...gallery[prevIndex], galleryType: selectedImage.galleryType });
  };

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'ArrowLeft') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    files.forEach(file => setUploadedImages(prev => [...prev, URL.createObjectURL(file)]));
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => {
        if (file.type.startsWith('image/')) {
          setUploadedImages(prev => [...prev, URL.createObjectURL(file)]);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#9B2C2C] text-white pb-20">
      {/* Top Header with 🦩 */}
      <div className="text-center pt-8 pb-8 px-4">
        <div className="flex justify-center items-center gap-4 md:gap-8 mb-6">
          <img src="https://pbs.twimg.com/profile_images/2050541986893967360/ST_LicrJ.jpg" 
               className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-white/30" 
               alt="The Beaks Art" />
          <span className="text-6xl">🦩</span>
          <img src="https://ugc.production.linktr.ee/c59c2aa5-72de-4792-8b72-ce4af12897f8_portrait-DimaDSC00409--------.jpeg?io=true&size=avatar-v3_0" 
               className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-white/30" 
               alt="Dima Kashtalyan" />
        </div>

        <h1 className={`${dancingScript.className} text-6xl md:text-7xl mb-3`}>THE BEAKS</h1>
        <p className="text-xl md:text-2xl text-white/90">Community Approved Entry</p>
        <p className="text-white/70 mt-2 text-sm md:text-base">1,111 surreal birds • 20 years of art now on-chain • by @DKashtalyan</p>
      </div>

      {/* Upload Zone */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div 
          className={`border-4 border-dashed rounded-3xl p-12 md:p-20 text-center cursor-pointer transition-all ${isDragging ? 'border-white bg-white/10' : 'border-white/40 hover:border-white/60'}`}
          onDrop={handleDrop}
          onDragOver={(e) => {e.preventDefault(); setIsDragging(true);}}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={70} className="mx-auto mb-6 text-white/70" />
          <p className="text-2xl md:text-3xl mb-3">Drop your Beaks here</p>
          <p className="text-white/60">or tap to browse files</p>
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" multiple className="hidden" />
        </div>
      </div>

      {/* 1/1 Revealed */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-4xl text-center mb-8"> Beaks Art 1/1 Reveal 🦩</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {oneOfOnes.map((item, i) => (
            <div key={i} onClick={() => openModal(item, i, 'oneOfOnes')} className="cursor-pointer rounded-3xl overflow-hidden border border-white/20 hover:border-white transition-all">
              <img src={item.url} className="w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Approved Community Arts Gallery */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-4xl md:text-5xl text-center mb-10">Approved Community Arts Gallery🦩</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {communityGallery.map((item, i) => (
            <div 
              key={i} 
              onClick={() => openModal(item, i, 'community')} 
              className="group relative overflow-hidden rounded-2xl aspect-square bg-black/30 border border-white/10 cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-4">
                <div className="text-base font-medium leading-tight">{item.title}</div>
                <div className="text-sm text-white/70">{item.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIMA'S Archive */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <h2 className="text-4xl md:text-5xl text-center mb-10">DIMA'S Archive</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {dimaArchive.map((item, i) => (
            <div 
              key={i} 
              onClick={() => openModal(item, i, 'dima')} 
              className="group relative overflow-hidden rounded-2xl aspect-square bg-black/30 border border-white/10 cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-4">
                <div className="text-base font-medium leading-tight">{item.title}</div>
                <div className="text-sm text-white/70">{item.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fan Arts */}
      {uploadedImages.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-3xl md:text-4xl text-center mb-8">The Beaks Fan Art</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {uploadedImages.map((url, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square bg-black/30 border border-white/10">
                <img src={url} alt="Fan Art" className="w-full h-full object-cover" />
                <button onClick={() => setUploadedImages(prev => prev.filter((_, idx) => idx !== i))} 
                        className="absolute top-3 right-3 bg-black/80 p-2 rounded-full opacity-0 group-hover:opacity-100">
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meet the Founder */}
      <div className="max-w-4xl mx-auto px-4 text-center pt-12">
        <h2 className="text-4xl md:text-5xl mb-8">Meet the Founder</h2>
        <div className="flex justify-center mb-6">
          <img src="https://ugc.production.linktr.ee/c59c2aa5-72de-4792-8b72-ce4af12897f8_portrait-DimaDSC00409--------.jpeg?io=true&size=avatar-v3_0" 
               className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-white/30" 
               alt="Dima Kashtalyan" />
        </div>
        <p className="text-2xl md:text-3xl mb-6">@DKashtalyan</p>
        <a href="https://linktr.ee/dkashtalyan" target="_blank" rel="noopener noreferrer" 
           className="inline-block bg-white/10 hover:bg-white/20 transition-colors text-white px-8 py-4 rounded-full text-lg font-medium">
          Visit Founder&apos;s Linktree
        </a>
      </div>

      <div className="text-center text-white/75 text-lg mt-16 px-4">
        Fan-made archive for the Beaks community • By @tbbboo1 🦩
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 md:p-4" onClick={closeModal}>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute -top-12 right-4 text-5xl text-white z-10">✕</button>
            
            <button onClick={goToPrevious} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-3 md:p-4 rounded-full z-10">
              <ChevronLeft size={36} />
            </button>
            <button onClick={goToNext} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black p-3 md:p-4 rounded-full z-10">
              <ChevronRight size={36} />
            </button>

            <div className="bg-black/80 rounded-3xl overflow-hidden border border-white/20">
              <img src={selectedImage.url} className="w-full max-h-[70vh] md:max-h-[75vh] object-contain mx-auto" />
              <div className="p-6 md:p-8 text-center border-t border-white/10">
                <div className="text-2xl md:text-3xl font-medium mb-3">{selectedImage.title}</div>
                <div className="text-xl md:text-2xl text-white/70">{selectedImage.artist}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}