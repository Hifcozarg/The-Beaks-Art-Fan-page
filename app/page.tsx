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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal State
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    artist: string;
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOneOfOne, setIsOneOfOne] = useState(false);

  // 1/1 Revealed
  const oneOfOnes = [
    { url: "https://pbs.twimg.com/media/HIMZOqvW0AArEP0.jpg", title: "First 1/1 Revealed", artist: "@DKashtalyan" },
    { url: "https://pbs.twimg.com/media/HISXDI8XkAALUPv.jpg", title: "Second 1/1 Revealed", artist: "@DKashtalyan" },
  ];

  // Community Gallery - COMPLETE WITH ALL ARTWORKS
  const communityGallery = [
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/0174ddf5-be45-4252-93fc-062b3886642a/cbcdf0f9-ef94-4217-a915-c71f392d4104.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMDE3NGRkZjUtYmU0NS00MjUyLTkzZmMtMDYyYjM4ODY2NDJhL2NiY2RmMGY5LWVmOTQtNDIxNy1hOTE1LWM3MWYzOTJkNDEwNC5naWYiLCJpYXQiOjE3NzkwMjYzMjMsImV4cCI6MTc3OTA2OTUyM30.Qwh85zambDr0mZJDU6iEaduvyDDF9XNunLxlIkh3ZNM", title: "Pixel Beak.gif", artist: "@blurnplay" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/57a14a3b-f290-4959-a72f-6e86c0ca9b58/adac113f-5ffe-4134-88f4-e8482985526e.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNTdhMTRhM2ItZjI5MC00OTU5LWE3MmYtNmU4NmMwY2E5YjU4L2FkYWMxMTNmLTVmZmUtNDEzNC04OGY0LWU4NDgyOTg1NTI2ZS5naWYiLCJpYXQiOjE3NzkwMjYzMjMsImV4cCI6MTc3OTA2OTUyM30.Cpgpz_oQWoKL1cDNPkjpwn04hz8npyMwby0BFdk2wSA", title: "Steampunk Pixel Beak", artist: "@Natt_369_" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/568a83ba-77b2-4e93-9bd0-a46340fd6d90/d5a2f6b3-95b7-41ea-a3fb-4931a91d867c.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNTY4YTgzYmEtNzdiMi00ZTkzLTliZDAtYTQ2MzQwZmQ2ZDkwL2Q1YTJmNmIzLTk1YjctNDFlYS1hM2ZiLTQ5MzFhOTFkODY3Yy5qcGVnIiwiaWF0IjoxNzc5MDI2MzIzLCJleHAiOjE3NzkwNjk1MjN9.85Mdenm-ltNNpz9_M8EO5V9TXUOYElGRzX_KVF9cUoQ", title: "Favorite Beak with Combination of unused tiles", artist: "@erfann5427" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/02818060-a1cf-4a69-a3ba-1351ee87b643/12eb4ad0-026b-432a-8bfb-70efdb57cae9.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMDI4MTgwNjAtYTFjZi00YTY5LWEzYmEtMTM1MWVlODdiNjQzLzEyZWI0YWQwLTAyNmItNDMyYS04YmZiLTcwZWZkYjU3Y2FlOS5qcGciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.S_xPsS7OIPhZeBKitg2f8EGF4_G3rUST3qB-VYmVbts", title: "A Leg Gives Beak Life", artist: "@dhirajleg" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/52f140fe-524c-486f-9550-9090e060ab2d/2c2c8cc6-e201-4860-a9d3-249fbab6a185.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNTJmMTQwZmUtNTI0Yy00ODZmLTk1NTAtOTA5MGUwNjBhYjJkLzJjMmM4Y2M2LWUyMDEtNDg2MC1hOWQzLTI0OWZiYWI2YTE4NS5qcGciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.ZgNNs0xkgbeiDORxVfL4iuu8qJqaFBP6NG6PTMnK2_o", title: "The Steamforged Beak", artist: "@batt004" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/994ad5d3-a4b9-4139-a752-2e3d0964935a/1c5f0eea-8446-4d21-bc88-ef054aea3a9b.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvOTk0YWQ1ZDMtYTRiOS00MTM5LWE3NTItMmUzZDA5NjQ5MzVhLzFjNWYwZWVhLTg0NDYtNGQyMS1iYzg4LWVmMDU0YWVhM2E5Yi5wbmciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.fMwp26GOo2LkONh24KfQnInFX-6XpgMaEvrUL0P8k7M", title: "Geisha", artist: "@Dejiiszn" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/b8f89cbd-7e30-471f-a39d-60d258ed2eae/868a5551-b5ad-49c3-ba53-3f70c9c33f5c.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvYjhmODljYmQtN2UzMC00NzFmLWEzOWQtNjBkMjU4ZWQyZWFlLzg2OGE1NTUxLWI1YWQtNDljMy1iYTUzLTNmNzBjOWMzM2Y1Yy5qcGVnIiwiaWF0IjoxNzc5MDQ1NzQ2LCJleHAiOjE3NzkwODg5NDZ9.pWT41IfMA7tI9N6j-zwCaS8Vr7jOHviPJ3scgGUBAp4", title: "The Creation of Beaks", artist: "@BitArtixt" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/522c37c4-14da-4347-86ba-ad7c04996437/b1a1e50e-a05e-4e44-adf2-91e161a3581d.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNTIyYzM3YzQtMTRkYS00MzQ3LTg2YmEtYWQ3YzA0OTk2NDM3L2IxYTFlNTBlLWEwNWUtNGU0NC1hZGYyLTkxZTE2MWEzNTgxZC5wbmciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.JeWKpq-pkKrBeb3I9JbNkUQ8ylCqI9J1mCyHs_AefgE", title: "The Beak Planet", artist: "@saintbrx" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/dae04321-461a-4739-b3cd-95a7f12c1d70/a2a2d2b6-aa43-4ef5-85b8-3c8eafc1967e.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvZGFlMDQzMjEtNDYxYS00NzM5LWIzY2QtOTVhN2YxMmMxZDcwL2EyYTJkMmI2LWFhNDMtNGVmNS04NWI4LTNjOGVhZmMxOTY3ZS5qcGciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.Iiee-aRksVwBOxz2CL2BbxTzF8nvWscUyR8JZ6Hehtc", title: "Untitled", artist: "@katongbems" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/cb7963ed-fa00-4d00-a20f-a11f9de3d2d0/0814defa-e90a-4d25-a4d1-1a589904af30.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvY2I3OTYzZWQtZmEwMC00ZDAwLWEyMGYtYTExZjlkZTNkMmQwLzA4MTRkZWZhLWU5MGEtNGQyNS1hNGQxLTFhNTg5OTA0YWYzMC5qcGciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.J3_a68o0pxobF_pFKSjmC7C4dH0_yreQeR2bhjT5PGg", title: "Nobody gave us a stage so we built ours", artist: "@valkiz_jr" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/5c7ed91e-8d56-48c5-8948-7d91b2d6c5fb/aeee0f6a-d877-43de-b65b-9180477c2bf7.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNWM3ZWQ5MWUtOGQ1Ni00OGM1LTg5NDgtN2Q5MWIyZDZjNWZiL2FlZWUwZjZhLWQ4NzctNDNkZS1iNjViLTkxODA0NzdjMmJmNy5qcGVnIiwiaWF0IjoxNzc5MDQ1NzQ2LCJleHAiOjE3NzkwODg5NDZ9.IjengGS1mUWfp-B1K8OfSWsWQH5M-OmWaX5ji4REYnY", title: "Folded Beak", artist: "@Saoirseyey" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/65f704ab-8f3e-4f36-92ec-3ce665840c10/9ddc631a-7f89-4ce7-a7f8-eef73083464f.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNjVmNzA0YWItOGYzZS00ZjM2LTkyZWMtM2NlNjY1ODQwYzEwLzlkZGM2MzFhLTdmODktNGNlNy1hN2Y4LWVlZjczMDgzNDY0Zi5qcGVnIiwiaWF0IjoxNzc5MDQ1NzQ2LCJleHAiOjE3NzkwODg5NDZ9.02N1BFp5i1jrxtvI0XBqEy9p5DvY4v7YEixgFDP8p0I", title: "Untitled", artist: "@doinkpTT" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/6f38a84e-1443-4af3-9ba1-2ba5a5cca643/967eef5a-c623-4be0-ab9f-257623db1e54.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNmYzOGE4NGUtMTQ0My00YWYzLTliYTEtMmJhNWE1Y2NhNjQzLzk2N2VlZjVhLWM2MjMtNGJlMC1hYjlmLTI1NzYyM2RiMWU1NC5wbmciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.mTPwFckM-yZWSulX5r0ZLYkJ4xPwQ1hDxG8Lif2dOWg", title: "embroidered case", artist: "@amberw3b" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/177853f2-f1d5-4aa8-90c5-ce8bcf2a4bbd/b175dc4e-03a7-48e0-bb6c-8e7d5b6b5f72.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMTc3ODUzZjItZjFkNS00YWE4LTkwYzUtY2U4YmNmMmE0YmJkL2IxNzVkYzRlLTAzYTctNDhlMC1iYjZjLThlN2Q1YjZiNWY3Mi5qcGVnIiwiaWF0IjoxNzc5MDQ1NzQ2LCJleHAiOjE3NzkwODg5NDZ9.TBwDD2QM7jWiaRbaDVOcQmNA-lggvSdKy5aJGgtiI60", title: "AUGUSTE RODIN IN FLOW STATE", artist: "@King____nft" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/18a41705-ac1a-4c34-ab65-4f7024e985d6/9c7e9b72-8c8a-4e49-8a4f-bb435b42b7fc.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMThhNDE3MDUtYWMxYS00YzM0LWFiNjUtNGY3MDI0ZTk4NWQ2LzljN2U5YjcyLThjOGEtNGU0OS04YTRmLWJiNDM1YjQyYjdmYy5qcGVnIiwiaWF0IjoxNzc5MDQ1NzQ2LCJleHAiOjE3NzkwODg5NDZ9.QHzUnB13AJFhooUAV3LiDAa0wrhXmfMvOduwYAgl7I0", title: "ANIME BEAK", artist: "@Uchenna603" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/50c83bec-650e-4380-9a73-54024bd688be/80b83c9c-77dc-4991-93a4-947788cfed3f.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNTBjODNiZWMtNjUwZS00MzgwLTlhNzMtNTQwMjRiZDY4OGJlLzgwYjgzYzljLTc3ZGMtNDk5MS05M2E0LTk0Nzc4OGNmZWQzZi5qcGciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.jr2_QAF_k7sWkHPJabNdKzosCifyKJSdx2jvgWAoRH8", title: "Murakami Beak", artist: "@Yizzz_web3" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/06b907c8-f154-4196-9008-7e7b5f9ca498/0aa055a8-0ad9-4536-b093-27aaa27af2ed.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMDZiOTA3YzgtZjE1NC00MTk2LTkwMDgtN2U3YjVmOWNhNDk4LzBhYTA1NWE4LTBhZDktNDUzNi1iMDkzLTI3YWFhMjdhZjJlZC5qcGciLCJpYXQiOjE3NzkwMjQxMDgsImV4cCI6MTc3OTA2NzMwOH0.yKWgcmgHHoSHF-bCe23RMMvL5O36SDS_FjAci5ntmjs", title: "PicaBeaks", artist: "@AVolcans" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/ec1bfd3e-ca8c-471f-a872-a96b1a8d6faf/d7b5ace2-50b4-46b7-add1-4de3bbe0effc.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvZWMxYmZkM2UtY2E4Yy00NzFmLWE4NzItYTk2YjFhOGQ2ZmFmL2Q3YjVhY2UyLTUwYjQtNDZiNy1hZGQxLTRkZTNiYmUwZWZmYy5qcGVnIiwiaWF0IjoxNzc5MDI0MTA4LCJleHAiOjE3NzkwNjczMDh9.xGNzdLY3vdNg2GNiXVMdWO8D6aj39sa3I75rmvz26AE", title: "Volcano beak", artist: "@0x_Castar" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/27aff7e5-eecf-4ed9-88e7-fb5478892904/e8a6ce6f-1d2a-49f8-a09f-b5a6ee0aca88.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMjdhZmY3ZTUtZWVjZi00ZWQ5LTg4ZTctZmI1NDc4ODkyOTA0L2U4YTZjZTZmLTFkMmEtNDlmOC1hMDlmLWI1YTZlZTBhY2E4OC53ZWJwIiwiaWF0IjoxNzc5MDI0MTA4LCJleHAiOjE3NzkwNjczMDh9.WPjSWS9dgJcaUgGfjnJm2C6t_qIUpzw4ImT9lzFt9mo", title: "The Beaks in Armenia", artist: "@ccshark64" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/1a0aea0c-b82b-4162-83b2-b14141678e36/c44a7936-aafd-429e-9731-321ff03624c2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMWEwYWVhMGMtYjgyYi00MTYyLTgzYjItYjE0MTQxNjc4ZTM2L2M0NGE3OTM2LWFhZmQtNDI5ZS05NzMxLTMyMWZmMDM2MjRjMi5qcGciLCJpYXQiOjE3NzkwMjYzMjMsImV4cCI6MTc3OTA2OTUyM30.10_gfopgLEm6n0O95acMVV6_9uo2Sx8BFWYfEruXxwg", title: "Celestial Veil", artist: "@OluwadamisiV" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/882b6edd-0f1e-4b6a-857a-3a81c039946b/2a7275f0-33c8-4cbb-8bda-e40818896ebb.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvODgyYjZlZGQtMGYxZS00YjZhLTg1N2EtM2E4MWMwMzk5NDZiLzJhNzI3NWYwLTMzYzgtNGNiYi04YmRhLWU0MDgxODg5NmViYi5qcGciLCJpYXQiOjE3NzkwMjYzMjMsImV4cCI6MTc3OTA2OTUyM30.4Fkf441NyPWhdK9HiS7e9SQnR1Zi2v81YRta49K2WWE", title: "astronaut beak", artist: "@BhellowO" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/4ca084e1-02f2-467e-aaec-c6b1fd24bddb/3ec00da5-9ac1-4292-a364-d6dc600b9010.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNGNhMDg0ZTEtMDJmMi00NjdlLWFhZWMtYzZiMWZkMjRiZGRiLzNlYzAwZGE1LTlhYzEtNDI5Mi1hMzY0LWQ2ZGM2MDBiOTAxMC5qcGVnIiwiaWF0IjoxNzc5MDI2MzIzLCJleHAiOjE3NzkwNjk1MjN9.b7Mux0Gs7CAv9gvYqq3y50LeSgOkpEk66CxFa0Gs7uM", title: "Rapstar Beaks", artist: "@Iam__robert" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/7f1ecc4a-9b11-4b01-b106-99708c581220/8343507a-20aa-428d-b14a-80a6d1156e99.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvN2YxZWNjNGEtOWIxMS00YjAxLWIxMDYtOTk3MDhjNTgxMjIwLzgzNDM1MDdhLTIwYWEtNDI4ZC1iMTRhLTgwYTZkMTE1NmU5OS5wbmciLCJpYXQiOjE3NzkwMjYzMjMsImV4cCI6MTc3OTA2OTUyM30.LgrcKZnQVmtJp1_iKKwbaKYopfM0A73IVg3zUiwBNYQ", title: "BREAK FREE", artist: "@0xJBoy" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/eb85fe5c-77f6-4160-a2e0-e56eadea70e7/2031ba80-f233-4d16-a0c8-daf9b5560c1b.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvZWI4NWZlNWMtNzdmNi00MTYwLWEyZTAtZTU2ZWFkZWE3MGU3LzIwMzFiYTgwLWYyMzMtNGQxNi1hMGM4LWRhZjliNTU2MGMxYi5qcGciLCJpYXQiOjE3NzkwMjYzMjMsImV4cCI6MTc3OTA2OTUyM30.T3oYAcxoMbtBvJAUhG3Ko015qK9lLAIBiEKApGKZw5c", title: "Quilling for Beaks ❤️", artist: "@amiirkaya" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/31a10294-cf8b-4a59-8207-1ad3329d6a33/beaks-in-wonderland-1778761076826.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMzFhMTAyOTQtY2Y4Yi00YTU5LTgyMDctMWFkMzMyOWQ2YTMzL2JlYWtzLWluLXdvbmRlcmxhbmQtMTc3ODc2MTA3NjgyNi5qcGciLCJpYXQiOjE3NzkwMjYzMjMsImV4cCI6MTc3OTA2OTUyM30._0zDAwiH2JFKUgwNHOYsmkd0rsVz112GJRDJ28Xv3qE", title: "BEAKS IN WONDERLAND", artist: "@Sirmee_kay" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/5f3ddab9-16c4-48cf-a9b7-b3f507e8ca97/9ed4eaa4-d86e-427b-b9f1-e4640ea75baf.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNWYzZGRhYjktMTZjNC00OGNmLWE5YjctYjNmNTA3ZThjYTk3LzllZDRlYWE0LWQ4NmUtNDI3Yi1iOWYxLWU0NjQwZWE3NWJhZi5qcGVnIiwiaWF0IjoxNzc5MDI2MzIzLCJleHAiOjE3NzkwNjk1MjN9.iYBZiRk3Tw6JrKdXEi2LCXQieDJHnPTiyoFwytFGbkU", title: "Every Roll start somewhere.", artist: "@lay_con2" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/14aca67c-b4e1-444b-86d4-11e942c23b62/3822e8a1-6974-48b9-98af-643d6a2e5ff5.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMTRhY2E2N2MtYjRlMS00NDRiLTg2ZDQtMTFlOTQyYzIzYjYyLzM4MjJlOGExLTY5NzQtNDhiOS05OGFmLTY0M2Q2YTJlNWZmNS5qcGVnIiwiaWF0IjoxNzc5MDI2MzIzLCJleHAiOjE3NzkwNjk1MjN9.ZBpRgLm4Wd6ED5xIOvkE-oCc_1i30aGeBk8dFNMfvJ4", title: "Geometric beak", artist: "@mr_wayne_2" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/d6a38c07-9e3c-4f27-b86d-3008d9021fcf/6866c831-fcdb-4fdd-bf20-b0148ee3dc0a.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvZDZhMzhjMDctOWUzYy00ZjI3LWI4NmQtMzAwOGQ5MDIxZmNmLzY4NjZjODMxLWZjZGItNGZkZC1iZjIwLWIwMTQ4ZWUzZGMwYS5qcGVnIiwiaWF0IjoxNzc5MDI2MzIzLCJleHAiOjE3NzkwNjk1MjN9.BSlICIbfpGz0UKFwnJ9TYSH_N0bXRdnaWrPUNvnZVYY", title: "Baroque Beak Masquerade", artist: "@fantasy_prone" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/23707d80-b62e-4b53-9e7a-f320285d149b/bdc47e49-bc8c-4fc9-9367-162ae04fcca1.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvMjM3MDdkODAtYjYyZS00YjUzLTllN2EtZjMyMDI4NWQxNDliL2JkYzQ3ZTQ5LWJjOGMtNGZjOS05MzY3LTE2MmFlMDRmY2NhMS5qcGVnIiwiaWF0IjoxNzc5MDI2MzIzLCJleHAiOjE3NzkwNjk1MjN9.HyupkertTQWWtMLcbs7cyhcpKYYzq9waiKs92191H2w", title: "THE GRAND VESSEL", artist: "@Calopo_" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/e4d64f57-2493-4b6c-9081-8eb093176d97/9d5710ae-e858-44e3-8e37-bb61e6cfc388.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvZTRkNjRmNTctMjQ5My00YjZjLTkwODEtOGViMDkzMTc2ZDk3LzlkNTcxMGFlLWU4NTgtNDRlMy04ZTM3LWJiNjFlNmNmYzM4OC5wbmciLCJpYXQiOjE3NzkwMjYzMjMsImV4cCI6MTc3OTA2OTUyM30.AV8ATVEJXDK-Nmb7NYm6_cyEPJDUPYomIFeBVTRyEC0", title: "Mutant beak", artist: "@q2darvo" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/e9b23da8-26ef-4db2-afb8-54dc81943df1/6c2e6662-c6bf-4e21-93bf-3f8cf53f607c.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvZTliMjNkYTgtMjZlZi00ZGIyLWFmYjgtNTRkYzgxOTQzZGYxLzZjMmU2NjYyLWM2YmYtNGUyMS05M2JmLTNmOGNmNTNmNjA3Yy5qcGciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.tofhMKSo7C82-Z5IQeNlxQ7qggNm27u9DHjuTTJWSOs", title: "Lake of goodness", artist: "@rohitisright" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/5aa73020-bdc1-490d-89be-0b3e4611d147/9cad0dd3-1d8b-4fd1-842b-e1f89743b5d1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvNWFhNzMwMjAtYmRjMS00OTBkLTg5YmUtMGIzZTQ2MTFkMTQ3LzljYWQwZGQzLTFkOGItNGZkMS04NDJiLWUxZjg5NzQzYjVkMS5qcGciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.PC-PPlqcWOEU_Od9LfXPWcp6liUxjH35hYgLNuT-qws", title: "CyberBeak", artist: "@Thee_Trailz" },
    { url: "https://ejtbprqsjgnckqbnwjrd.supabase.co/storage/v1/object/sign/contest-art/5a6056af-5dc7-4d95-b4ef-a19f6f7fd6dd/8ed93cc1-89d4-4540-8537-3d2e9959cd76/7118685f-2775-4dd2-b854-c9f15bc9a378.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMzY4MzIyNS03ZDFiLTRjOTMtYmI1OS0zZjI3NjFhNWM0ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb250ZXN0LWFydC81YTYwNTZhZi01ZGM3LTRkOTUtYjRlZi1hMTlmNmY3ZmQ2ZGQvOGVkOTNjYzEtODlkNC00NTQwLTg1MzctM2QyZTk5NTljZDc2LzcxMTg2ODVmLTI3NzUtNGRkMi1iODU0LWM5ZjE1YmM5YTM3OC5wbmciLCJpYXQiOjE3NzkwNDU3NDYsImV4cCI6MTc3OTA4ODk0Nn0.t7D7Z2Hu50N7Ijeh69oJwBQDSN4H5_MwYpOiF4_EqHI", title: "Ancient Beak", artist: "@velori_" }
  ];

  const openModal = (item: { url: string; title: string; artist: string }, index: number, fromOneOfOne: boolean) => {
    setSelectedImage(item);
    setCurrentIndex(index);
    setIsOneOfOne(fromOneOfOne);
  };

  const closeModal = () => setSelectedImage(null);

  const goToNext = () => {
    if (isOneOfOne) {
      const next = (currentIndex + 1) % oneOfOnes.length;
      setCurrentIndex(next);
      setSelectedImage(oneOfOnes[next]);
    } else {
      const next = (currentIndex + 1) % communityGallery.length;
      setCurrentIndex(next);
      setSelectedImage(communityGallery[next]);
    }
  };

  const goToPrevious = () => {
    if (isOneOfOne) {
      const prev = (currentIndex - 1 + oneOfOnes.length) % oneOfOnes.length;
      setCurrentIndex(prev);
      setSelectedImage(oneOfOnes[prev]);
    } else {
      const prev = (currentIndex - 1 + communityGallery.length) % communityGallery.length;
      setCurrentIndex(prev);
      setSelectedImage(communityGallery[prev]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'ArrowLeft') goToPrevious();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, isOneOfOne]);

  const handleFiles = (files: File[]) => {
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prev => [...prev, ...newPreviews]);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')));
  }, []);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };

  return (
    <div className="min-h-screen bg-[#9B2C2C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header - Exact as your screenshot */}
        <div className="text-center mb-16">
          <div className="flex justify-center gap-8 mb-6">
            <img src="https://pbs.twimg.com/profile_images/2050541986893967360/ST_LicrJ.jpg" alt="Beak Art" className="w-52 h-52 rounded-full border-4 border-white/30 object-cover shadow-2xl" />
            <img src="https://ugc.production.linktr.ee/c59c2aa5-72de-4792-8b72-ce4af12897f8_portrait-DimaDSC00409--------.jpeg?io=true&size=avatar-v3_0" alt="Founder" className="w-52 h-52 rounded-full border-4 border-white/30 object-cover shadow-2xl" />
          </div>
          
          <div className="flex justify-center mb-4">
            <span className="text-6xl">🦩</span>
          </div>
          
          <h1 className={`${dancingScript.className} text-[7.2rem] leading-none font-bold tracking-[-4px] mb-2`}>THE BEAKS</h1>
          
          <p className="text-3xl text-white/90 font-light tracking-wide">Community Approved Entry</p>
          
          <p className="text-xl text-white/80 mt-3">1,111 surreal birds • 20 years of art now on-chain ▫️ by DIMA KASHTALYAN</p>
        </div>

        {/* Upload Area */}
        <div 
          onClick={handleClick} 
          onDragOver={(e) => {e.preventDefault(); setIsDragging(true);}} 
          onDragLeave={() => setIsDragging(false)} 
          onDrop={onDrop}
          className={`border-2 border-dashed border-white/40 rounded-3xl p-20 text-center mb-20 cursor-pointer bg-white/5 ${isDragging ? 'border-white bg-white/10' : 'hover:border-white/60'}`}
        >
          <Upload className="mx-auto mb-6 text-white/70" size={80} />
          <h2 className="text-4xl mb-4">Drop your Beaks here</h2>
          <p className="text-xl text-white/70">or click to browse files</p>
          <input type="file" multiple accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileInput} />
        </div>

        {/* 1/1 Revealed */}
        <div className="mb-20">
          <h2 className="text-4xl mb-8 text-center font-serif">The Beaks Arts 1/1 Revealed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {oneOfOnes.map((item, i) => (
              <div key={`one-${i}`} className="relative overflow-hidden rounded-3xl aspect-video bg-black/30 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => openModal(item, i, true)}>
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-6">
                  <div className="text-xl font-medium">{item.title}</div>
                  <div className="text-white/70">{item.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl mb-10 text-center">Approved Community Arts Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {communityGallery.map((item, i) => (
              <div key={`comm-${i}`} className="relative overflow-hidden rounded-2xl aspect-square bg-black/30 border border-white/10 cursor-pointer hover:scale-[1.03] transition-transform" onClick={() => openModal(item, i, false)}>
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-5">
                  <div className="text-lg font-medium leading-tight mb-1">{item.title}</div>
                  <div className="text-white/80 text-sm">{item.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fan Art */}
        {uploadedImages.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl mb-10 text-center font-serif">The Beaks Fan Art</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uploadedImages.map((url, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square bg-black/30 border border-white/10">
                  <img src={url} alt="Fan Art" className="w-full h-full object-cover" />
                  <button onClick={() => setUploadedImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 bg-black/80 p-2 rounded-full opacity-0 group-hover:opacity-100">
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Founder Section */}
        <div className="mt-24 pt-12 border-t border-white/20 text-center">
          <h2 className="text-3xl mb-8">Meet the Founder</h2>
          <div className="flex justify-center mb-6">
            <img src="https://ugc.production.linktr.ee/c59c2aa5-72de-4792-8b72-ce4af12897f8_portrait-DimaDSC00409--------.jpeg?io=true&size=avatar-v3_0" alt="Dima Kashtalyan" className="w-40 h-40 rounded-full border-4 border-white/30 object-cover shadow-xl" />
          </div>
          <p className="text-xl mb-6">@DKashtalyan</p>
          <a href="https://linktr.ee/dkashtalyan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-8 py-4 rounded-2xl text-lg font-medium">
            Visit Founder&apos;s Linktree
          </a>
        </div>

        <div className="mt-16 text-center text-white/60 text-sm">
          Fan-made archive for the Beaks community •
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute -top-12 right-0 text-white/70 hover:text-white text-4xl transition-colors z-10">✕</button>
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full z-10"><ChevronLeft size={36} /></button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full z-10"><ChevronRight size={36} /></button>

            <div className="bg-black/90 rounded-3xl overflow-hidden border border-white/20 relative">
              <div className="absolute inset-0 bg-white/10 pointer-events-none" />
              <img src={selectedImage.url} alt={selectedImage.title} className="w-full max-h-[82vh] object-contain mx-auto" />
              <div className="p-8 text-center border-t border-white/10">
                <div className="text-3xl font-medium mb-3">{selectedImage.title}</div>
                <div className="text-2xl text-white/70">{selectedImage.artist}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}