import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../constants";
import { Box, Button, useToast } from '@chakra-ui/react';

const GoogleOAuth = () => {
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
    
      if (response && response.access_token) {
        setLoading(true);
        try {
          const body = {
            access_token: response.access_token,
          };
          const res = await axios.post(
            BASE_URL,
            {
              query: `
              mutation Mutation($jsonInput: String!) {
                signWithGoogle(json_input: $jsonInput) {
                  message
                  me {
                    is_insta_connected
                    is_tiktok_connected
                    email
                    id
                    is_varified
                    name
                    permissions
                    picture
                    pricing_id
                    pricing_plan
                  }
                  success
                }
              
              
              }
              `,
              variables: {
                jsonInput: JSON.stringify(body),
              },
              
            },
            {
              withCredentials: true,
            }
          );

          if (res.data.data.signWithGoogle.success) {
          
            if (res.data.data.signWithGoogle.me.is_insta_connected) {
              navigate('/page');
            } else {
              navigate('/nextpage', { state: { accessToken: response.access_token } });
            }
          } else {
            throw new Error('Login with Google Failed');
          }
        } catch (err) {
          setError(err.message);
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      } else {
        console.error('Access token is undefined');
      }
    },
  });
  

  const test = async () => {
    const response = await axios.post(
      'https://www-useast1a.tiktok.com/passport/web/send_code/?aid=1459&account_sdk_source=web&sdk_version=2.0.2-tiktok&language=en&verifyFp=verify_liaaco6c_3hRTztvX_4o04_4MIj_B4vE_ueRQMDdxLvRJ&target_aid=&shark_extra=%7B%22aid%22:1459,%22app_name%22:%22Tik_Tok_Login%22,%22channel%22:%22tiktok_web%22,%22device_platform%22:%22web_pc%22,%22device_id%22:%227187451655108118022%22,%22region%22:%22ET%22,%22priority_region%22:%22%22,%22os%22:%22windows%22,%22referer%22:%22https:%2F%2Fwww.google.com%2F%22,%22root_referer%22:%22https:%2F%2Fwww.google.com%2F%22,%22cookie_enabled%22:true,%22screen_width%22:1920,%22screen_height%22:1080,%22browser_language%22:%22en-US%22,%22browser_platform%22:%22Win32%22,%22browser_name%22:%22Mozilla%22,%22browser_version%22:%225.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F113.0.0.0+Safari%2F537.36%22,%22browser_online%22:true,%22verifyFp%22:%22verify_liaaco6c_3hRTztvX_4o04_4MIj_B4vE_ueRQMDdxLvRJ%22,%22app_language%22:%22en%22,%22webcast_language%22:%22en%22,%22tz_name%22:%22Europe%2FIstanbul%22,%22is_page_visible%22:true,%22focus_state%22:true,%22is_fullscreen%22:false,%22history_len%22:4,%22battery_info%22:null%7D&msToken=l7st-ezzDPrccB3VHukrAIxRK0gHmT_snIQcLyO1rcL3VKRKJ4z3lUcvIE_c8wGrXxStklk8jilGQSPDWjdU7fUN4OJedaJB7N5Rd_6zCq7C1z2XNmjW9ZVWuFgXg0xUrSOrGg==&X-Bogus=DFSzswVLus9jvPtvtSgjrQYklTXz&_signature=_02B4Z6wo00001mx38pAAAIDDsgGqNZP62J5sd.YAAP93ff',
      new URLSearchParams({
        'mix_mode': '1',
        'mobile': '2e373034253c3535313636343630',
        'type': '3731',
        'aid': '1459',
        'is_sso': 'false',
        'account_sdk_source': 'web',
        'region': 'ET',
        'language': 'en',
        'is6Digits': '1',
        'fixed_mix_mode': '1'
      }),
      {
        headers: {
          'authority': 'www-useast1a.tiktok.com',
          'accept': 'application/json, text/javascript',
          'accept-language': 'en-US,en;q=0.9',
          'cookie': '_ttp=2BczWhWGI2bYehNI25QDRn933K1; sid_guard=f07cdf79ec78f0ca63c4fa6870bf17e3%7C1663525582%7C5184000%7CThu%2C+17-Nov-2022+18%3A26%3A22+GMT; _abck=D19C70EE3777488FE659A6604DF92701~0~YAAQCZQQApB8VPGEAQAAeOrtoQk3ueHAJKjKeJT0D7XZ9oGkhPpDTIP8+j0hW1PYY8h0Mn1YEpWPF7vEI3Aneu++hcnZQMMNNmxmNUw88IvloK95RKt7b/vvsri+AJljBn/VphPpCFn4A8FWL2IZkf67jyfDCGDrWzITcJZF72C/rlHrFz+K1YenSUaGdapBaLv2iLFEbE8HsVPo0T1rXc8QQNpEsC9vm9lxZ6oyrr8Mpgg2gtv5ORCJR2qeooZ6MHcIHAIJD+eae0Dc+vHEs5p5zp1qhHFpNK2yOElWZvwDNXWkDQpQldOJ7PAcE1pRxWOh+G4gu6ckLBDQKJSYOEjLGynzZp0G6O+o14+SRNJqi49xB1GXgdzG4BSF3jCs3Kv2R2Em1Qc9v7xesVQBAWyN3VAvGzAY~-1~||-1||~-1; odin_tt=35d073d0f6882ae1331203dc97e0fe30f42939031cbdb7795896eb5bbb88ac580847a9da771b4a28bd5a03a380a9ad8e42087df662a630dab2bc2c8b12a5fc9186e9070d0573598e96f9a6f816633aef; tt_csrf_token=VDhuZO3O-RM6Uy6eDR9vM2OmWsbUk5GsQ2qQ; ttwid=1%7Ch-fu_bsdsEjiJd5ImRA4VZFVC3nFMWZQNgdyKInjNcU%7C1685451566%7Cf9b21fdee6211028e377387fbb16975c86843eb012c1bea3b7418619dc8b3bf6; passport_csrf_token=36a780a1fdfa8b2bd4de885d177a8245; passport_csrf_token_default=36a780a1fdfa8b2bd4de885d177a8245; s_v_web_id=verify_liaaco6c_3hRTztvX_4o04_4MIj_B4vE_ueRQMDdxLvRJ; msToken=YryMrotMdakZixSkYiiWoaFPJiTdnbyqtNDDPS3kxKq3iR8lOU0fa3gF-ud3E-j-eGOVk-z8a-sTJsWlainsOqnAG_McvRW46W915Xx0BAWwz0ngaH-rprnAGhnX5F4-o6EDzQ==',
          'htc6j8njvn-a': '2BUr=rXAH_4n6k5VXULQ44yVkffvqdswoLu7O4iZg29xHaieK3XLU=nY6xY-K92MopmviwZhjcQ=sfuhAcUaW9AU61PzzcjLQGsM7DzfJLnvnm-l3KWECdKEBQ-7QqOXvx8Bd-lxTGU43OR6vTwGD85RCqq5HfhBfE_X-keKH6jubIymhxwAA9le1rUZK6pM-F3mZwczAEBRwpBc94VWafOiC87HZV7KuncHw8MCdOI5PCkkVZfVnZTDlV_qbQjNMhLJpg4YvL-EK3C9qqvSdGjaynJ4E=46fLh_YX3K-=55E-rhHUUWvu1wSgLl6UwN_RRDTF8Phizx-yVTTH-XYil_HObAj81murH_hhCfa-u3nDLJLchZIMMYMXy7e7TaxKiy4-8LZXttmqZTSGhg5d_jQZaIJ1KAIwUPAl42zDendzlQMKv2DHfcItzw_s5wGw9xghBZNzTUPvUH5NO_rO9CmuEKXVVyzkw9faocvN1U1OyXVklRUvNm2ytQ76ZQOUNfbTYgzjoOTov_sQ5PiW4_rIpfX2BsB9V4P-T-yfwB38xWqtNDjx8iMvJw5o1ksMAPTtIJF1oRhcz75RRM-RYy5h53xssY_=rm7B9vVYyUKXrLyahbnGEwi1yzs8SNqvxIQPa4BgrcMpAfv24u78Yer-kd8FiGY8U=izEiTYu2AwqKjkCjze4wl2d9Oy2KMwit9aDyHpAHP9wfm5zKwrM7J39DjYpuwVQsaoeNGodiu-Pfwtu7vqq2Ctt_-9Lxj_Tgmvrs6Q9IlaXTBLAfQ4BxorpEg-LG_ubYENq6sU8qcyVRDlS2zD2cXP4O86deGwhakXu8kKxwmnhMECUL6tA3oAynyaKysoLMWVpLgTO1KrIDSkPemLwh4b1UZwZSHgBfzZxjGtapRHcf4CxSCgp=n2d-=I_1sXOsTZga8wqiWzDHSsnPf5WnRrgpmvpb_g4lFtq6N2X=5-ZfGmw2pmuQuJTzN3n-Z9QwLcwQ4J1pE-nE9GfJvk=NqYS6W5FJ3KNhHl=K_QdZapwqhpO77VVwJORUAOR6aJRQGuLSFupWWi6XJmOTNRLLqiKbFAjphR5TTb3esLu7D-eFpnE71c8=oQWf8INj5zubgLRqrLyUM66je1ReV4tPDvB9esaISSQiHFtscsgwKVC_FuECYE5i95wcOlqNsHZmIQ3DXWqn=aRnJEEIhiBpS=W5xRBT-InqUQHh=OXKQgJHuEV7vI81XtNMrVlpLScE-UcEjlnA3cSOUrXuZVkCZkkwnfTwRFNwd2=7VWG8-6KcLVp8OHxNJMlOtXAHsOQId_VBG4vE7R7CdAE8PwrTylXaAnW4kuG8IAUH4cYozFsC6ALBKDcA64Wn6PDsb-H1=OdVFxZ9xnsE66PtdmelYEzll54pgwA4oXpKrc2s6FbqIthm1EG5C3O-NaKC7FJYZaGJ7N75jAV71oDqXJvRBJrQjaHB6TKX9kPNCfttvn5KQXrWtI-bbFQXJS9SB-YoXOdZF8jAJzXrNR8NDZBRoYYvSl94vNp_Ud=5JLN4U_6PMBWDM-8SuUv1hcbXdcygOBQPvMh_9UIlQBiiZLlBsT51B_L3We9H-vWqAGdC=QMVlPf7y2t82Zn9DZQuuNA=6dFBPQr5WdorFKXWe-BKRjZgAoiqOY64sRJDX-nDAcwi-vXh8-4UxnO=eKSjDHnOZ51zVnDG-1mKkdVy64eyZYrZD6gzUutjNDaRsCoGsUfJvN9tN2I3T2A1RJzZXo5GvwO5hBQszVaIUyBmr=MecEX9MTFfaEYkSAtTRv-uqqkhbtUSF8M1s_dLsGN47fBYAn1IIJJh75XFec7=TwkelB2wUS8kDTIyroqdTxIGrWjBq5zKktp1OVqMRvr=3_VFlZwMT2D_jKWCKH3EflbDzSfSb3xvxnFcOUtCsVparS_VRm8mlEhmbSb6UFWuJRw_bFtkHQK4-neVbH=OReYN8_m_kKApHsyoCXOye3gggWrjbURaErJt5di=aEnKEq7pcVqmOEs6inpuUQSv=n4s=ezlIuhaX=VMUdXiXiF1xjWBb8VfzONNpAYqyOUEmoXWRyZFDoNZ36ZO-gyU357Viej8hGREf558EjIe9hWRSaF7IY1OPP6XnHB14vLYqqXvMehWXHakKfcXyJ4ODCkJEq5ngQ3Pc3cIYKPUEwwX6BytHulGJb8F65Gxo51BpXWXSvI5z9tAIZy1mPzEKpajEY-KIteJrIThQhdd1gUNFIkrmANPsn89u7V-eSdsu6QbcmoEf=8aKjkqEri6LCe1QwV=Zj3dPk5e28dDautW=mpge6lG6GbhC=j3ZZoZ2IBm=6WEnxl9Q5JkeYddD1rlWIK_qvCDdRWkVh=8UetvLfW5egD7gAh5fYMJkeFrAhetqdddUrNyFJaX4Oj_lIeavO5rNfkRg=jFBQLavZhO=T5YuDie_o=jyDpbvyixh6aMEqqiO=1A2hJ8v3LoCTlEFtrLYA6WZco43FNCJMOb3z2dmvEoiR-9WJxesSS7O9g_SFneEdOW9S6z46xpBfJGyteGbUB2PNXgfuwHJJhLfe3sRdgsnjs2AsldgF1mNMicCu2EoA2cCHmphocvi-Tupp3Lx_C8nzYrtF6T-gVDBHlwavdb3EzO4=A4oMNMDOGF_U7fEAAOOmWnWE1-vnStmvnbuojHv91te3_YUEFa4CkPaXnHRHobZBLl8TFLt2UacjGuELwVZvLYvb4QUBfsfgi=aoxhRNp_QJG1NljZqkwxmqhtLxXJgxnMMeILX4SfF5bBAFP4uWQwFIuqwV9EnERMxDzJwTHVDkKV4=yeRA_cnrL7-Q4HiRUMyRmvHd9xRBM_-K7c7gKCN=gJSXE7_DxSzcRRzR8IE12ocFxQ6hnOYswdPt8yQ5LJfiHEVUtfKBt_JXTs5uPy2Yzrx2DjQ9GKPjvNFqjxOldaIj1Ge-fu_GPMPbvT3s66tJA7IvpCC3WHVkAZzPPQYOWB2pzn1dnQRlzRUAFaqYa2H3qySWabby_3IOpgpkvX=ubbmBrd6OPTi5UnVXF5EnY=aTaqqbhTvVuxgQfOL2mLt=T6UoCfxnRMjmUET1l9gJIrxOBReT9G4ZkJH=W7W85hTf9-eU9LAELBW8PLuS1=NGHVw1Gafczt-KUmJhqtcIJZfbWRHw9MkzHrYVB5Iac_7vRo9-rult7xFMfZG4DLYc2EF-LkqF6AXSW-7s4Stbb1ypBNMIxoPeHZSZllfJHuxXEpxSfM1xsr7VZW2hVn7YdBfS641BByMu5N878=9vmlDSF94RsYcQEOD-XOzQ=mE2L-i_Bh31e-b7UrHwJbLMhjKXyw6-X2WxfPY5ybclELtmGeJRjYre2u_WnFmqAhF7EugwDdZVXpm1e4abVtDA-SLuvfyQQ6D9GL_Ia6FZe8Ge6QkOFdYxCC8WTCyAsbveHOIQC=2gNjuapr5J5_64ZTQi1g4nNITQY2fzn5ZKKSkN3v5X4Y=ri8ESRKOszzqKi1shEZwLdTc_7ckpZc6bmmbuU9GjAz4aaJmAPfYOPhlx=YG5T7bNYWcconDFAphRzdjH6-cxV9rlfqZdqcav1vhmGy6uwE39n_v9Nz2Vh2YpHf53z8ewbxm6YbJp-ZUga7KMxiw_ARv3YD7dTRQrsJWyHZD4uOYKtd8Dh5tApdaClMntZNUt6f_nO9qktB6GtofUX9pY5C=5yfUa4T=449w__xzDJUCfBjV5RE3Pm7SCZQ_d5OADtrogx8rwGffD3xlGZibsbVma8VuUdOyf63jICguXAvwGonccKDqZaxk9atviG1beNh-jMZdu1AQs6lphw2FooT1vUReL7ejGuxAhwROxvwrWyJiYP3888EVfJ_paB-UNqjorxQ3E1P9yaVBeqcTELaU1ngyWesGCqb_T5i4WsUukIBIG6RPOUvPUS3G3LLT=JUwH=qNr179itdZWovvfn_-e7sGk6NsaMEtHF4cK5WkGe3749ouML-DpgEFesIbZAXFKc28Mq7==NxLR8io4yP6A_p=dnWfxUZclVQ22X2qg_np2J-ziNbhChzptzLVNETzvNK8YRjTGJa2cuAWguIfycr9BadhzpXOKTcB=D7N-SALY7scmlN9=aaR4qoYPaHAYPHWWJq-64fDc9v35hCa2Qg_GSE_ypnneBFqBnCodpuP951FTtrKSyM5r3X2WuUKdlAylxWQYqJLAJgVTJeaDCPAHuSnv2PtUTlo-GpADf1u_6H9IkHnGh6HGHCsY_yX9mp8=TVlnuJOvkx8ZY22SHMg9g3gRHQyBk5T4=2dsycgDH_ZCGKqYkWy3FR1gPsrAyds_QjdCVaNi-=VqaqLo7a8r96fR5WRVDajVZVjQVkb8Tg4TBzo8KBy2w12T9_EwRMMoXFwGvDb6LvyFAz-8hJ2Jq2__mz2DlQjdnbVdmvilbAw6jMNQxaY2EeFaWtRHf=2aQaq6zHDhNtqLlLXWzHb5UxVy3Aq=kkpsqc48Jz7fu7dVPat7YgNOxgJwl1CgaBbAQYckpYhVZLd7l5u1GgDBkDn7N_CQKjJQvDcOKZITrMK59LyOkuTB6WHOij8mvx-micBevtu2sNoLyxFl3HqqM4EVsZgxX3xAL5yuqbNUBj9-kZdgb1lTZORZm-3bGDTtXBzwZOUBd31OgmFLC-cc7WAepWrGITfu6doNZ22kgf=84_AIjV6sWLsjA8W=iaaSgqNZop5DbJ=LH8AFMyMcIz1ixCbUiCC21SjAAgXBLJJpgSW_DbKtAOrAGSKKkonCaV9x8pVM9rlFa6fPnyYO_W=EF8KvPBJoMa6N1eFQi=5ychVzH_pM7CRjZKQUnPclSvvgy11MeIi1wEkpzL8ofh=UAxDPFX9OTKdIZXhmXzHHwX3gZLhtgMwLC63-M_VoTqd1p64bY5V23gDyVd6BcfJa=tIsZyaLw4zwUd-sSaRJ6hb3M5Ka=PslWBmrhNWxZb1PMshbRzCvancVW7bLMklNmblRJwpbXXULtO4ZfIyWjqi-m25A1dCo1gBHyKckhs2Z4o9ES3oMNkSc=QWkZRW41fVkXdvyTpSUd6lZjKUoXGzTa1IqYusql6ZD8OUDxufZ1awRJJ25nvvUSUnXDj27m4ZBNBhsBDsL68cOytb5tJnT2_1lofj45y5uR23oTrvBT7Aqf-YUpn1yChpxK7rA-yzGROBPMM6CAXEitLv82uy6gyMvOD6pvmh4QUIUkNUGFptNH3LRzFKGhhjWuWe6u5MnNnXoCefSJvBjgrTOp6Y-c31U4Lw9HuTvhmfS6xLjr5o=yAHHSossviB3D1eimP8Y6L3fyg4HDA8QNC1zsYt975hj6Ktt7FKvttDArw4JRvegJ7jdT==Ga3QZX-dfwZFNVzoRv2zIya9rwo-EbJksmqGbmAkPUG_fdnyfo3d9eOnw2Bf8O3jLVgUN=spOT_VEpsDo7--C99PwtFIzYPj_q7gVdlKT_oDl8D_XpxybDKXZFfjUKd9=38Ue7beE6-VKhEx3MDGMvbf1tnA6sROnLlaOzGHy9DDPS9Xa2g4bjbsOXo4g2WRPWHlhl_BhBD7BXFfMZMeLbROg_TtusH2XgqYnqKuk3rsN1udJTwoZVGVdePswQ1vzRPp-xdEHWyHr=H3IbYwuFhT91hI46I8dMdDg9sbpRdbuUwbgE1bl8qxlXxi79L8Ty-ft=y6AgME371okGonk5GJKvAdGJRnG8r--cRhalPCXnG=-RlY3a2zQlX6npjkhOazDpYZCuZuhqdltTBJ-cMvuzJ4zT=QsY3ltHgCoYtWv3OssMlVNfVfI8WjpxgRVkBSlWP8Zzl_JBFm=Cb2le-CPkHEXvITLu_TdOYRQzygs=kLoLe2I2MaW9CYc875a4aFH3dQphNdoDSc8P3l9Y6nM7u9PpI6OwLPTwJNNItGiGZfiTbH1ewmEPL3NEEUI7XRTrf28GLdE-et5Wz_hLjC4li_f3iDvdCJryWgfc6kf57IhVGWopU6Mqb_4FYVGDCL7Y-NT_=PxSEsNml7vAOfFh=jEPvSr=FdZM-D5gtogm6DxCsBLm4rP=nOjBqnPB4lXr3PEVeAvRubFfwgI1fsw5jUXhhZAwFD_E7G_daZLw7F=oKjLZxSvpc7Ggm2wlFeCr998__=l6Vwuy8kePi13wdsuyfK1YUoVWavu8Dm9ZuGa4ghbXy2vEukyd6GqAQTwIaOY2CYRvdnUBTpz_B_-MbOCAtvWVZ-jO=oxh4m-GxV4NfJVYGtyt4EoKPTrJiMlQ9sHDz9ZcmCY6aGlEBIKKbDDMbutMOAd_Uj-KOjK8kgUqTQHc9-eZ7r3V7HdszmTMQrzZK1zaYHlwt_9HSAY3qZtsffvvOj9pVaAEqJThonFrAi82Bxa5HKIWLwqbb3O52wLr=K7Cg-4aU1AdNlMDKXLO5h8lo2aGKwA9yNULu3Xw=CA8LDcs6bHkdYEnmU5d=LnHaZ8NdeMC9wfCc5prS2zo3fNbATlrliEzt_Vr-F69NfyaPaHqoKY7pbBBKk6aXzQG2NYEONqxuoAgflUjzFkzGbIoeyL=UK=CRGYP9ZgG-EgLzcGUYX3vDReAqWrMLuujt2nqE3D=7gf8nFWaH-z-KS_6Y7GVdrFnLDCpFQW1RZYJqnlSpXVa4TXJnD9fz7WT-iU8Y5uh48vvPRVR7EbZ1MWsDz93UlAb9=R=PmS6niTIEG9eUuVYU8dFwoJOAMgltR5FEJ4CNrycP6xqItX7erChc7HfM-z7SHbpm5jQvAB6fB8_Nm9RVEci4Q43Vzr35-GQJH_JrHYJskAzFZOyV9X7dNumtpq6qPEiqDzyDyEBJhmQktFF7RZRBqQCgKDlGwaa1v6OPhwRvjeU=DQ9KH=-phguR34AZPmM9_sGoQBuCbJltrJZnZGMAnDE8sirH5F_VksjXiRI-tF3kKoewcQc5ZjJIoiXhj2JZ1mdQSUJq5CYTWmbVKcKjiQKWsP=yXX2FVFtksKgTpbrIf5Y9xxHEOfNq1nUsM_O2IJJzjochTP-8czJS_p-3t_ylcrEo9vlSrzh-R5mD57u_IEbGOqhDISx9VI_chw54jiuZ9IBp22aa=B6ewm6-Z_jqvrE_4xkFSDqZj5fPmLArBqVbFAaPqixWSHtRkS2uoTGp49KG4MACvkT5VZYWJu7Sl1TsJERUG2gEzT6Hbj4wvnDACRWj3i8ZTyl--GREO7EVrmlhNV32hglqTlUR5CnMUv5lcAcFdTtumWKWfzHZtRaqzC3P7oxGN1xC-VkLeBF7wzKDND4WurXvddH4pb6DBaR=tZYygnY3FmFFqXvIA7IlSD6MnUEwec_RD_yvAD-z4QNbyl=oAUtvqmHVwB9fAZyALxy6ZB7pTIbnDQf9l3sAXRnF8fq_rCw1m6PD-JXiyXcd1uXsnUaYr4HLGHBuuPlWIpYqIiB8-yi5FdadsGgpX7M3Fl_UrAaNUA28FlS9xjag=F=O_q5Gt9oWUvX=hrkLfDExJfIa1amwCCNyVo1Fxk75kKQn2iOq2nexSur6OU3blQZtVaXhOimThEeDg=3O-OhlrvtQ28Ml5s5BmLJZX5Z3zU4TkeuUM-HQ-d6Tn3kyd8S-OiJuWv8VNYUP8DiNw3SNBlxI=gdSN-cPQ7KGEvo8fzSso_l_ajGisRwbETSrbIy_ncHOFfQkYCpdKgo4_QaDborjDPgCk=VYOZaqT9zIZVpljbqun6XToLPTAk=V7qxACTAdXSizVV7d8fFuxlkMf4Qw_V',
          'htc6j8njvn-b': 'd1etf',
          'htc6j8njvn-c': 'AED5omyIAQAAcMtZSQUTNeUSqieETStuBiWK3gVSL4Zc1qdML3PunwXIdoPA',
          'htc6j8njvn-d': 'ABaAhIDBCKGFgQGAAYIQgISigaIAwBGAzvpCzi_33wdz7p8FyHaDwAAAAAAbNPOeAHTR2L18IEXzl6C3I_w763M',
          'htc6j8njvn-f': 'A5PgvWyIAQAAhE1XepQeMbps8N6LiDUb4uwUEM33SThfQuS1nrcf78v0qdxDAcS-ecKucn0ewH8AAEB3AAAAAA==',
          'htc6j8njvn-z': 'q',
          'origin': 'https://www.tiktok.com',
          'referer': 'https://www.tiktok.com/',
          'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
          'x-mssdk-info': 'xPyI0TkdiR0.XgcbNqU32.yWb8tLYFNm5WzA0uj.XyKgwrPuba9S79EREQzGjl60yDz4vQfrfI9LqG0zQWg1G00FEeM0X9awuyLrlb-VGCmp.BckYxLN3n8dyeF8AcBiz63bq-nZrEBVvmX7jbrZJsquZb7tbXyiNBFGPHxnNrveDrSivSbUrWfLNny.tpRo4UrRywuUViza6MLJ7KS3.kD81QNorc62DemFHgEveTQkgdEdMKGwFHzmlDQ3KHCg-yjrNhUhZwKRllLFZRj8GW1Pr4OgTOgg8vRwuZOLJQltrHhqtn6xdcLLdVL7jE-HGyjHne.RjKY0N2bD9nrt9R9DDDXg61HxrUYuK6-3g74PA65w1xxfxQv69XHSaVfvhuUztGio02IJyJ-LfiD9DgvWkT6.rH.MvOVcnGevNCykTgw4.sCSnn3xJBDDSBvKdWjNN3.RfHy4sH-0Vq1oyunVG5kKLKlrDGzDFPCxju1U.c6rtexbJZWI5GyX5mKd8nb08-AQo57yYG4OuAZdtazpIVlMNbfFTNqNvHILmV9hWg7DhO-mjVP5A-Yq1A3C.D.EXYs-ABEJL4-mN9qJOPMjatE0nMb-SYNGbHgNdPBj1pf2DjHlO3yw3p.uZNQWIYk9EHEjgmocBZ98Ie3kTDWo4td5d6KX99wdnbxrMg.Qq1BNkimknm7gRXfVDigS0K-qdf0UoHBOXW6lTU5HkWGf921MNtvSIjfePChw3oDeHKiuYQQUsFNOOiPCQdWnwdZYZKBLmuVDKtxpICVIM0--mF.SqsUjBiKoDWzT4CA6d8RPSdH899a6jfyZQyHS096SdgtR.vWOfTRk5BCXZd-7OQCJEM7.uUVmKuISO.nfKghIUgY.RqqpJgEbOXbs.l9-ohY5hHLUG-zfo-x-EKK3GDJAD-WUxh-WRq4iDkwNKnnczfEPRcbSqSPnVsOH5DHB9pGRZhWAfdRW5kIzB0tw8K4C2DBlHidJO7y1PtoJeAI4UB7..oueJ0Oog6abpJzFAWGVCmWhsVNWOGhjCrFEOiMMLeppVNdjvzdMfZiy12CvCxDqBNCo7pe-GpGI.74rGNqfOfeoglfijwq4KChzfSDxfQnK9SWVCFRwk5HN9cpV1EaphqQO3.BO1wesLv7e46i-AxxLiWu7mIruH9HqH0WTK4h2hmC6iuCfiyQdvt7JJSwrKarJ8oRI1LKUO4G4rx2YDikgrLCOCS3b0ibUMX0lN72aiB6AVODhMCBg9PW5ejrRpIDiDoB4BnZH8s8YsYDi9eNBJJI4vQwzkBFFlH-A1l4c5t.vd7ZbV7wTnHoME-tm-1fX4UsNiflQZmWA6K51j6sm-AHpVuYFiuMLXYUxZWbepsV2Qno7cva.1lYw8-iy-uXS3dFsme-qcrKu0y5iNPiuCe3r3605BabIvI.wTqMa3Py3J4kxyXwWXyoQl4EB9RUMWuKJ2VsqROc1z.qf3mfgpx.Do-GOOjVjooZIEFktyNKjuIxUht-pc2rachhlcMhp8SLMx.9rAe9ZIwSyaICe7E2pSIKUr4kgmeNLo8JGsKEieKb.OIVq2YN646je6n0XXtG7bdPrwdn-5m-hygthzOmTi2lG9hvZFklmnVmJ-wYmNJL2qCUpCu1sSoM7q1UuRWXuv-U0ChCurB-ewXa2rbYU7DthuKcSHZ4Imj4qA5qSc4hKWp6wYENEN7gC6D1SCIgaTPL23jNuOmgm0v-9ozGriI3udSt5DB8ce6-z0Li6UkbvxBALUZEdtqrlDNuKnKr9VpXa5YxaGNDDVgPj8I8pRpe3OKftNYNs9CPDKgsCg7R9kXOYYJXoJFkpQgvdrs3Xp3qo2AABnR9SOrVZWUUkFIbVALGPf-WtUyB44slf4FcOc00fxFdyQqIfmHsoKMBymA0t.jMN1pUs6f7D.TmAkwwxRiBymJbub9JeFsz33ZA6SCxhun-YnkliLF.DTs81bNAe-oqAWzD4ueym1EaQiF1RMWK4EjPCwzF60MXVyAwl6kM8-rAH9e-zQ2ZfMg2VOwHDJAVX.54mwrwXrG0E24uMHi8HSsFDDJl8NVPCrfqhTFFkYjP7KFweq0gh5WjEMGbGI69A9j2og-SehiA4RZwOu.K4TSI3Xpp27bxrhgf3CXck8g8tIlxHrMjWQlBqWhbHMMm028kWQeO0WUX2n1WXFQHlHt4DzDYLXuYei7Yq9r9RGWY4HFrNQiR1MDAKMaXkCsmxwKGh3UNMpMOcrCldr01ddy.A-IHKHGyMhgOEcjqZUHt-c0eZdCXIAR5hrluFzCaCg9con7QydyV6u2OlBjCyt8-vN2ynqu6LYYRM0OAgxFm7GiyWPseJVmoylB2yAm5zpPjO1Ec8-SrL9Eu4rvbv9lEB0zhEBlOdD24HWmOs-lQGd-daIDqFUuUbPKb2Nak-DfbwY9lvG6lFhfVP5JcZa7zMQxF4fdzY6OBM941hlSuf.xWVHwVEBcpyfCO98E.eCp4kCtN18L1l2eFl6wMmMEUU1BfL6e1NeLCd1G5m7DtTZNvAs9-38-qEwBMgAycw9hanUDNKX1SfoJC5NnlEGDmgy49n7cNjULR0XpRfKKD70dQlEO4x-NoDGWJK9KrZnFjhJ29q0DwgDmSUJ2m4w09QcxR2YLYXYbMQ-UDo.DMzzD6JF1bUTPZ1mibpzvv2vKUqrDHAhFYKJL33aY2I7SBVVue8leR95fK-6ZPI2DtF6jwQC9VsJU6x7FZDLUniJJCOrusOxWbvysJni3sNaQfKa92nkMGRIjq.OHFkvjuH7J42rQ0HRpLdqV99zraiC1cNwDDQ.Z2MT82IHmCbnuSEFlMWbbW.gIb9Y-oiUVBHQoOm.tnTbDyxcPQG5G6s0ZDTIjtJzwsPV8anmjL1fuHzrqixylIt.MMHDYzgEpn6sNe4e9OD3Nkn5GNS1w-v--5JJS5qHOyQ0hjZzvu3vsjI1COqGerj1oM-sV5mCFwGmmAVt1IyGXzfca4fLpAzyGBY5GK8hBm1i2gMZen9EKCymhzDyEUxUuMsWGdW9fck76SE1ExcAH5FQLX5MR-Xzqc-YzwlQP1fsG97L7.2Ab3TNYEWJbwkg.N6g.G4b4kE6l0o8zYJ8ifbrvLlmxmkwr6swx2BaOD11c3mRQf4-p4lDMpDBwfoDWGezvMbT8U0mCygmIYXYYliTSlKjJNe-EHxKyOOQ3mvQaZo3HEkNusaedEiPxeMQOCqxKTmfwBOX6tUTebB5.mU4uvRWs.nkZLhVQLq4UYkKIIglCM4Ckg4a3PdTNW1SYGT-BsLpZvFnAlMpCCpyU0Zf4iLn06Kd4GFX-DWtx1j3P4rlp67MfeYdT0mts8eKZqBPc9.ORpwicz2hwcZpn5DkXWTqu4DHKjz0Cia1cc6UBqMAFMq9QJOSUOY0VW20p1quyOHWjXizc-IMpXCIGKFgEUC.pTAGQMSwyuqzbsQxV1qvbMzTKrBBbITyZ9qIefkcObO3swXsVl9265DTCabMXzHcuVUi1tCsBQAOXw=',
          'x-tt-passport-csrf-token': '36a780a1fdfa8b2bd4de885d177a8245',
          'x-tt-passport-ttwid-ticket': 'AatSwVc0A3vFoQ04E7cXy7ZbM6550oVgHuc7dxLsfzotrce3uXy81OVb1kgvmJEiQw=='
        }
      }
    );
    console.log(response.data);
  };

  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Button leftIcon={<FaGoogle />} colorScheme="red" variant="outline" isLoading={loading} loadingText="Signing in" onClick={test}>
        Continue with Google
      </Button>
    </Box>
  );
};

export default GoogleOAuth;
