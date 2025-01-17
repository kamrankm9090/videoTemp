export const useMockData = () => {
  const tempVideoData1 = [
    {
      id: 0,
      url: 'https://www.shutterstock.com/shutterstock/videos/1096287727/preview/stock-footage-lorem-ipsum-fancy-text-placeholder-clip.mp4',
    },
    {
      id: 2,
      url: 'https://www.shutterstock.com/shutterstock/videos/3607670213/preview/stock-footage-frame-without-text-with-a-speech-bubble-against-colorful-lines-moving-on-vintage-red-and-beige.mp4',
    },
    {
      id: 3,
      url: 'https://www.shutterstock.com/shutterstock/videos/3614014009/preview/stock-footage-wow-text-on-speech-bubble-against-colorful-lines-moving-on-blue-background.mp4',
    },
    {
      id: 4,
      url: 'https://www.shutterstock.com/shutterstock/videos/3611947749/preview/stock-footage-frame-without-text-with-a-speech-bubble-against-colorful-lines-moving-on-purple-background.mp4',
    },
    {
      id: 5,
      url: 'https://www.shutterstock.com/shutterstock/videos/3611411375/preview/stock-footage-frame-without-text-with-a-speech-bubble-against-colorful-lines-moving-on-yellow-background.mp4',
    },
    {
      id: 6,
      url: 'https://www.shutterstock.com/shutterstock/videos/3614014083/preview/stock-footage-wow-text-on-speech-bubble-against-colorful-lines-moving-on-pink-background.mp4',
    },
    {
      id: 7,
      url: 'https://www.shutterstock.com/shutterstock/videos/3607670159/preview/stock-footage-frame-without-text-with-a-speech-bubble-against-colorful-lines-moving-on-pink-background.mp4',
    },
    {
      id: 8,
      url: 'https://www.shutterstock.com/shutterstock/videos/3611051485/preview/stock-footage-wow-text-on-speech-bubble-against-colorful-lines-moving-on-purple-background.mp4',
    },
    {
      id: 9,
      url: 'https://www.shutterstock.com/shutterstock/videos/1096287721/preview/stock-footage-lorem-ipsum-placeholder-clip-with-red-and-orange-animated-background.mp4',
    },
    {
      id: 10,
      url: 'https://www.shutterstock.com/shutterstock/videos/1029569669/preview/stock-footage-dnipro-ukraine-may-people-play-bumperball-zorbsoccer-outdoor-party-time-may-in.mp4',
    },
    {
      id: 11,
      url: 'https://media.istockphoto.com/id/1413207061/fi/video/tieliikenne-delhin-teill%C3%A4.mp4?s=mp4-640x640-is&k=20&c=iribF1qneIStE7YufLyv1ddLOJXardqQGBzskXWu-DI=',
    },
    {
      id: 12,
      url: 'https://media.istockphoto.com/id/1309022662/fi/video/vanhojen-kirjasivujen-selaaminen-l%C3%A4hikuva.mp4?s=mp4-640x640-is&k=20&c=baFHsTSQASigNx23bYW-p9JXZuu3-s8nab-nWK7tm4o=',
    },
    {
      id: 13,
      url: 'https://media.istockphoto.com/id/2044099144/fi/video/l%C3%A4hikuva-jossa-on-yksityiskohtia-kirjaimista-valkoisella-kirja-arkilla.mp4?s=mp4-640x640-is&k=20&c=e04TEpJsIA9cuoO_evK2YPZjP-ToOKtKtsyq5xXNxyg=',
    },
    {
      id: 14,
      url: 'https://media.istockphoto.com/id/1158722823/fi/video/animoitu-valkoinen-k%C3%A4sinkirjain-lause-hei-ven%C3%A4j%C3%A4ksi.mp4?s=mp4-640x640-is&k=20&c=EIC_YZxD1rB-A3pUCPSJHXXFvoxhwndNRqqERMAeYM0=',
    },
    {
      id: 15,
      url: 'https://media.istockphoto.com/id/474705144/fi/video/kirjallisuus-kiehkura.mp4?s=mp4-640x640-is&k=20&c=gSIOrTtnoe3glL3E3Alimv_DkthbcQXMgqv1x6sE6D0=',
    },
    {
      id: 16,
      url: 'https://media.istockphoto.com/id/905894524/fi/video/vihkisormukset-kirjasivulla.mp4?s=mp4-640x640-is&k=20&c=rA4w6w-1mW7PxBFciOHbY-em_6MhFfyGXYccqmLYO-w=',
    },
    {
      id: 17,
      url: 'https://media.istockphoto.com/id/2044099216/fi/video/l%C3%A4hikuva-jossa-on-yksityiskohtia-kirjaimista-valkoisella-kirja-arkilla.mp4?s=mp4-640x640-is&k=20&c=RJgYzKlrwQUPC-Tk8Mrq4gr6YgAguBZ9i6oNt5NXvRQ=',
    },
    {
      id: 18,
      url: 'https://media.istockphoto.com/id/2175937320/fi/video/uutisotsikko-joka-keskittyy-kriittiseen-toimintasuunnitelmaan-ja-ehdottaa-merkitt%C3%A4vi%C3%A4.mp4?s=mp4-640x640-is&k=20&c=0nkn6sEjBbSFmmObLiBa55mOU0FJRI8eqbvZfvK-3gQ=',
    },
    {
      id: 19,
      url: 'https://media.istockphoto.com/id/1281102272/fi/video/miksi-n%C3%A4k%C3%B6ni-on-ep%C3%A4selv%C3%A4.mp4?s=mp4-640x640-is&k=20&c=pfixBphGcs-qsDm_6MlNu2ccGCtbt4gX-wLZDRhWiQM=',
    },
    {
      id: 20,
      url: 'https://media.istockphoto.com/id/1416926932/fi/video/lesotho-teksti-joka-avautuu-ja-sulkeutuu.mp4?s=mp4-640x640-is&k=20&c=LyRPMiHqY0U91qgEYiMOynlEnjVYs3OMN-IKtbtgfW0=',
    },
    {
      id: 21,
      url: 'https://media.istockphoto.com/id/1157663018/fi/video/liikkuva-k%C3%A4sin-piirretty-k%C3%A4sikirjoitus-hello-ven%C3%A4j%C3%A4ksi-4k-toon.mp4?s=mp4-640x640-is&k=20&c=el2hAe650L-cxVObB6I3eRHGcNMn6K_QvV8gspjc43o=',
    },
    {
      id: 22,
      url: 'https://media.istockphoto.com/id/1303470377/fi/video/design-hashtag-valkoisella-taustalla-sosiaalisen-median-julkaisukonsepti.mp4?s=mp4-640x640-is&k=20&c=SkZPtKUEnm32ofTNvZ_4ETplY14bMFCbsbsn5nWQVuM=',
    },
    {
      id: 23,
      url: 'https://media.istockphoto.com/id/1295010036/fi/video/vaaleanpunainen-korostuskyn%C3%A4-merkitsee-sanamedian-makrokuva-valikoiva-kohdistus.mp4?s=mp4-640x640-is&k=20&c=TqLWB9K3IdOke0MUb1LsWP3adZE_TdHaipkOJ2NnslI=',
    },
    {
      id: 24,
      url: 'https://media.istockphoto.com/id/1295010036/fi/video/vaaleanpunainen-korostuskyn%C3%A4-merkitsee-sanamedian-makrokuva-valikoiva-kohdistus.mp4?s=mp4-640x640-is&k=20&c=TqLWB9K3IdOke0MUb1LsWP3adZE_TdHaipkOJ2NnslI=',
    },
    {
      id: 25,
      url: 'https://media.istockphoto.com/id/1202595938/fi/video/web-suunnittelun-esittely.mp4?s=mp4-640x640-is&k=20&c=erbAdwHMRz_1FZRBnyhjZHRETJs-2-01i8hjI8wV6CA=',
    },
    {
      id: 26,
      url: 'https://media.istockphoto.com/id/1310504331/fi/video/design-teksti-ponnahtaa-esiin-loupe-kuvakkeesta-k%C3%A4siteleike.mp4?s=mp4-640x640-is&k=20&c=i_HpFtK0mf9qkISYQ2w1ju_54nzAsXGdmK5YMmim0l8=',
    },
    {
      id: 27,
      url: 'https://media.istockphoto.com/id/1046702728/fi/video/tullisotateksti-liukenee-hiukkasiksi-ja-katoaa.mp4?s=mp4-640x640-is&k=20&c=KAh7ysUhVhq7K0vAZMnSdySevhoWA0PXCLewWICWgx4=',
    },
    {
      id: 28,
      url: 'https://media.istockphoto.com/id/2086950205/fi/video/videoteksti-uutiset.mp4?s=mp4-640x640-is&k=20&c=e2AnF7qeuZOq3zKpkrdGg0tUipvk1ybD2I6igUHTWmY=',
    },
    {
      id: 29,
      url: 'https://media.istockphoto.com/id/1357642131/fi/video/s%C3%A4hk%C3%B6isten-julkaisujen-rivill%C3%A4-oleva-taloudellinen-laiminly%C3%B6nti.mp4?s=mp4-640x640-is&k=20&c=Jv6QrxckSwhmIL667K8C2PZDYmpMRk-vCNvr7ynvqLA=',
    },
    {
      id: 30,
      url: 'https://media.istockphoto.com/id/2149795873/fi/video/valikkootsikon-kirjoittaminen-sivulle.mp4?s=mp4-640x640-is&k=20&c=OC6crFsLBxyqjWa5HaA-MU_hQHiS_EOCn_ELHsZahWE=',
    },
    {
      id: 31,
      url: 'https://media.istockphoto.com/id/1496159838/fi/video/osallistavat-kansalaisoikeudet-ja-lgbtq-tasa-arvo.mp4?s=mp4-640x640-is&k=20&c=zDBsyjKrKz9lqm2-cj7jQtXdJrWxoSBR8hWsoqwdsUU=',
    },
    {
      id: 32,
      url: 'https://media.istockphoto.com/id/1146521016/fi/video/infektiosana-tarkoittaa-englanninkielist%C3%A4-sanastoa-virussairauden-tarttumista-hygieniaa.mp4?s=mp4-640x640-is&k=20&c=Ck-c3b5pIepY3t8R0CNCWADJ0nDaLbzwK-OU-vfKhlM=',
    },
    {
      id: 33,
      url: 'https://media.istockphoto.com/id/1077094000/fi/video/inspiroivia-sanoja-tekstikineettinen-typografia-animaatio.mp4?s=mp4-640x640-is&k=20&c=F_XX-kYYLKKh47gaYAPV8bimzq7apVLyL1gT5NL-zRI=',
    },
    {
      id: 34,
      url: 'https://media.istockphoto.com/id/2148310126/fi/video/palestiinan-tekstiuutiset.mp4?s=mp4-640x640-is&k=20&c=tr9-5kWufQtyEI4mLGOCu1ElCOL8ETIvStSocVR9aCs=',
    },
    {
      id: 35,
      url: 'https://media.istockphoto.com/id/1206495384/fi/video/hiiri-napsauttaa-tykk%C3%A4%C3%A4-painiketta-tilaa-painiketta-ja-kelloilmoitusta-haluatko-ett%C3%A4.mp4?s=mp4-640x640-is&k=20&c=twEoZweYbNTKW2V0Tz63g1TD96HUQgn6SDcWEok3Xh8=',
    },
    {
      id: 36,
      url: 'https://media.istockphoto.com/id/507983427/fi/video/laki.mp4?s=mp4-640x640-is&k=20&c=rcsFumFQYNohYn3_7EDh3HIBQFFh61TvwP_sNAe280I=',
    },
  ];

  const tempVideoData2 = [
    {
      id: 0,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-1.mp4',
    },
    {
      id: 1,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-2.mp4',
    },
    {
      id: 2,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-3.mp4',
    },
    {
      id: 3,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-4.mp4',
    },
    {
      id: 4,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-5.mp4',
    },
    {
      id: 5,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-6.mp4',
    },
    {
      id: 6,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-7.mp4',
    },
    {
      id: 7,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-8.mp4',
    },
    {
      id: 8,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-9.mp4',
    },
    {
      id: 9,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-10.mp4',
    },
    {
      id: 10,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-11.mp4',
    },
    {
      id: 11,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-12.mp4',
    },
    {
      id: 12,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-13.mp4',
    },
    {
      id: 13,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-14.mp4',
    },
    {
      id: 14,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-15.mp4',
    },
    {
      id: 15,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-16.mp4',
    },
    {
      id: 16,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-17.mp4',
    },
    {
      id: 17,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-18.mp4',
    },
    {
      id: 18,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-19.mp4',
    },
    {
      id: 19,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-20.mp4',
    },
    {
      id: 20,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-21.mp4',
    },
    {
      id: 21,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-22.mp4',
    },
    {
      id: 22,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-23.mp4',
    },
    {
      id: 23,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-24.mp4',
    },
    {
      id: 24,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-25.mp4',
    },
    {
      id: 25,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-26.mp4',
    },
    {
      id: 26,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-27.mp4',
    },
    {
      id: 27,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-28.mp4',
    },
    {
      id: 28,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-29.mp4',
    },
    {
      id: 29,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-30.mp4',
    },
    {
      id: 30,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-31.mp4',
    },
    {
      id: 31,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-32.mp4',
    },
    {
      id: 32,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-33.mp4',
    },
    {
      id: 33,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-34.mp4',
    },
    {
      id: 34,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-35.mp4',
    },
    {
      id: 35,
      url: 'https://klpmedia.blob.core.windows.net/klpmedia/files/file-36.mp4',
    },
  ];

  return {tempVideoData1, tempVideoData2};
};
