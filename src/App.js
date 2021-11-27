import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TranslateIcon from "@mui/icons-material/Translate";
import IconButton from "@mui/material/IconButton";
import { vocab } from "./vocab";

function App() {
  const [input, setInput] = useState("");
  const [japanese, setJapanese] = useState(false);
  const [qOrder, setQOrder] = useState(
    shuffle([...Array(vocab.length).keys()])
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [added, setAdded] = useState(false);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const inputField = useRef();

  useEffect(() => {
    window.addEventListener("keydown", function handler(e) {
      if (inputField.current !== null) {
        if (/[a-zA-Z. ]/.test(e.key)) {
          inputField.current.focus();
        }
        switch (e.code) {
          case "Escape":
            inputField.current.blur();
            break;
          default:
            break;
        }
      }
    });
  }, []);

  function shuffle(array) {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  function reset() {
    setGameOver(false);
    setQOrder(shuffle([...Array(vocab.length).keys()]));
    setCurrentIdx(0);
  }

  function addToList() {
    setList((prev) => [...prev, qOrder[currentIdx]]);
    setAdded(true);
  }

  function removeFromList() {
    let index = list.indexOf(qOrder[currentIdx]);
    if (index > -1) {
      list.splice(index, 1);
    }
    setAdded(false);
  }

  function reveal() {
    setShow(true);
  }

  function hide() {
    setShow(false);
  }

  function download() {
    const element = document.createElement("a");
    let string = `Meaning\t\t\t\tRomaji\t\t\tKana\n------------------------------------------------------------\n`;
    for (let i = 0; i < list.length; i++) {
      if (vocab[list[i]][2].length < 8) {
        if (vocab[list[i]][1].length < 8) {
          string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 16) {
          string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 24) {
          string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t${
            vocab[list[i]][0]
          }\n`;
        } else {
          string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}${
            vocab[list[i]][0]
          }\n`;
        }
      } else if (vocab[list[i]][2].length < 16) {
        if (vocab[list[i]][1].length < 8) {
          string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 16) {
          string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 24) {
          string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t${
            vocab[list[i]][0]
          }\n`;
        } else {
          string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}${
            vocab[list[i]][0]
          }\n`;
        }
      } else if (vocab[list[i]][2].length < 24) {
        if (vocab[list[i]][1].length < 8) {
          string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 16) {
          string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 24) {
          string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t${
            vocab[list[i]][0]
          }\n`;
        } else {
          string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}${
            vocab[list[i]][0]
          }\n`;
        }
      } else {
        if (vocab[list[i]][1].length < 8) {
          string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 16) {
          string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 24) {
          string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t${
            vocab[list[i]][0]
          }\n`;
        } else {
          string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}${
            vocab[list[i]][0]
          }\n`;
        }
      }
    }
    const blob = new Blob([string], { type: "text/plain; charset=utf-8" });
    element.href = URL.createObjectURL(blob);
    element.download = "added.txt";
    document.body.appendChild(element);
    element.click();
  }

  useEffect(() => {
    if (!gameOver) {
      if (
        japanese
          ? input === vocab[qOrder[currentIdx]][0]
          : input === vocab[qOrder[currentIdx]][1]
      ) {
        setCurrentIdx((prev) => prev + 1);
        setInput("");
        if (currentIdx >= vocab.length - 1) {
          setJapanese(false);
          setGameOver(true);
        }
      }
      if (list.includes(qOrder[currentIdx])) {
        setAdded(true);
      } else {
        setAdded(false);
      }
    }
  }, [input, qOrder, currentIdx, list, gameOver, japanese]);

  useEffect(() => {
    setShow(false);
  }, [currentIdx]);

  let thing = [  [["aimasu", "会います"], ["au", "会う"], ["atte", "会って"], "to meet"],
  [["akemasu", "開けます"], ["akeru", "開ける"], ["akete", "開けて"], "to open"],
  [["agemasu", "あげます"], ["ageru", "あげる"], ["agete", "あげて"], "to give"],
  [["asobimasu", "遊びます"], ["asobu", "遊ぶ"], ["asonde", "遊んで"], "to play, to socialize"],
  [["atsumarimasu", "集まります"], ["atsumaru", "集まる"], ["atsumatte", "集まって"], "to collect"],
  [["atsumemasu", "集めます"], ["atsumeru", "集める"], ["atsumete", "集めて"], "to collect"],
  [["araimasu", "洗います"], ["arau", "洗う"], ["aratte", "洗って"], "to wash"],
  [["arimasu", "あります"], ["aru", "ある"], ["atte", "あって"], "to be, to exist"],
  [["arukimasu", "歩きます"], ["aruku", "歩く"], ["aruite", "歩いて"], "to walk"],
  [["iimasu", "言います"], ["iu", "言う"], ["itte", "言って"], "to say"],
  [["ikimasu", "行きます"], ["iku", "行く"], ["itte", "行って"], "to go"],
  [["isogimasu", "急ぎます"], ["isogu", "急ぐ"], ["isoide", "急いで"], "to hurry"],
  [["imasu", "います"], ["iru", "いる"], ["ite", "いて"], "to be, to exist"],
  [["iremasu", "入れます"], ["ireru", "入れる"], ["irete", "入れて"], "to put in"],
  [["ugokimasu", "動きます"], ["ugoku", "動く"], ["ugoite", "動いて"], "to move"],
  [["utaimasu", "歌います"], ["utau", "歌う"], ["utatte", "歌って"], "to sing"],
  [["umaremasu", "生まれます"], ["umareru", "生まれる"], ["umarete", "生まれて"], "to be born"],
  [["urimasu", "売ります"], ["uru", "売る"], ["utte", "売って"], "to sell"],
  [["erabimasu", "選びます"], ["erabu", "選ぶ"], ["erande", "選んで"], "to choose"],
  [["okimasu", "起きます"], ["okiru", "起きる"], ["okite", "起きて"], "to wake up, to get up"],
  [["okurimasu", "送ります"], ["okuru", "送る"], ["okutte", "送って"], "to send"],
  [["okorimasu", "怒ります"], ["okoru", "怒る"], ["okotte", "怒って"], "to get angry"],
  [["oshiemasu", "教えます"], ["oshieru", "教える"], ["oshiete", "教えて"], "to teach, to tell"],
  [["oshimasu", "押します"], ["osu", "押す"], ["oshite", "押して"], "to push"],
  [["otoshimasu", "落とします"], ["otosu", "落とす"], ["otoshite", "落として"], "to drop"],
  [["odorimasu", "踊ります"], ["odoru", "踊る"], ["odotte", "踊って"], "to dance"],
  [["oboemasu", "覚えます"], ["oboeru", "覚える"], ["oboete", "覚えて"], "to learn, to remember"],
  [["omoimasu", "思います"], ["omou", "思う"], ["omotte", "思って"], "to think"],
  [["orimasu", "降ります"], ["oriru", "降りる"], ["orite", "降りて"], "to get off"],
  [["owarimasu", "終わります"], ["owaru", "終わる"], ["owatte", "終わって"], "to end"],
  [["kaimasu", "買います"], ["kau", "買う"], ["katte", "買って"], "to buy"],
  [["kaimasu", "かいます"], ["kau", "かう"], ["katte", "かって"], "to keep a pet"],
  [["kaeshimasu", "返します"], ["kaesu", "返す"], ["kaeshite", "返して"], "to return something"],
  [["kaerimasu", "帰ります"], ["kaeru", "帰る"], ["kaette", "帰って"], "to go home"],
  [["kakarimasu", "かかります"], ["kakaru", "かかる"], ["kakatte", "かかって"], "to take"],
  [["kakimasu", "描きます"], ["kaku", "描く"], ["kaite", "描いて"], "to draw"],
  [["kakimasu", "書きます"], ["kaku", "書く"], ["kaite", "書いて"], "to write"],
  [["kagiokakemasu", "鍵をかけます"], ["kagiokakeru", "鍵をかける"], ["kagiokakete", "鍵をかけて"], "to lock"],
  [["denwaokakemasu", "電話をかけます"], ["denwaokakeru", "電話をかける"], ["denwaokakete", "電話をかけて"], "to make a phone call"],
  [["meganeokakemasu", "眼鏡をかけます"], ["meganeokakeru", "眼鏡をかける"], ["meganeokakete", "眼鏡をかけて"], "to wear glasses"],
  [["kashimasu", "貸します"], ["kasu", "貸す"], ["kashite", "貸して"], "to lend"],
  [["kachimasu", "勝ちます"], ["katsu", "勝つ"], ["katte", "勝って"], "to win"],
  [["kaburimasu", "被ります"], ["kaburu", "被る"], ["kabutte", "被って"], "to wear (hats etc)"],
  [["karimasu", "借ります"], ["kariru", "借りる"], ["karite", "借りて"], "to borrow"],
  [["nodogakawakimasu", "喉が渇きます"], ["nodogakawaku", "喉が渇く"], ["nodogakawaite", "喉が渇いて"], "to be thirsty"],
  [["kangaemasu", "考えます"], ["kangaeru", "考える"], ["kangaete", "考えて"], "to think"],
  [["ganbarimasu", "頑張ります"], ["ganbaru", "頑張る"], ["ganbatte", "頑張って"], "to do one's best, to endure"],
  [["kikimasu", "聞きます"], ["kiku", "聞く"], ["kiite", "聞いて"], "to hear, to listen"],
  [["kikoemasu", "聞こえます"], ["kikoeru", "聞こえる"], ["kikoete", "聞こえて"], "to be audible"],
  [["kimemasu", "決めます"], ["kimeru", "決める"], ["kimete", "決めて"], "to decide"],
  [["kimasu", "着ます"], ["kiru", "着る"], ["kite", "着て"], "to wear"],
  [["kumorimasu", "曇ります"], ["kumoru", "曇る"], ["kumotte", "曇って"], "to be cloudy"],
  [["kimasu", "来ます"], ["kuru", "來る"], ["kite", "来て"], "to come"],
  [["kotaemasu", "答えます"], ["kotaeru", "答える"], ["kotaete", "答えて"], "to answer"],
  [["komimasu", "込みます"], ["komu", "込む"], ["konde", "込んで"], "to be crowded"],
  [["shinimasu", "死にます"], ["shinu", "死ぬ"], ["shinde", "死んで"], "to die"],
  [["shimemasu", "閉めます"], ["shimeru", "閉める"], ["shimete", "閉めて"], "to close"],
  [["shirasemasu", "知らせます"], ["shiraseru", "知らせる"], ["shirasete", "知らせて"], "to notify"],
  [["shirimasu", "知ります"], ["shiru", "知る"], ["shitte", "知って"], "to know"],
  [["suimasu", "吸います"], ["suu", "吸う"], ["sutte", "吸って"], "to smoke, to inhale"],
  [["onakagasuiteimasu", "お腹が空いています"], ["onakagasuiteiru", "お腹が空いている"], ["onakagasuiteite", "お腹が空いていて"], "to get hungry"],
  [["sutemasu", "捨てます"], ["suteru", "捨てる"], ["sutete", "捨てて"], "to throw out"],
  [["sumimasu", "住みます"], ["sumu", "住む"], ["sunde", "住んで"], "to live"],
  [["shimasu", "します"], ["suru", "する"], ["shite", "して"], "to do"],
  [["suwarimasu", "座ります"], ["suwaru", "座る"], ["suwatte", "座って"], "to sit"],
  [["dashimasu", "出します"], ["dasu", "出す"], ["dashite", "出して"], "to put out, to hand in"],
  [["tasukemasu", "助けます"], ["tasukeru", "助ける"], ["tasukete", "助けて"], "to help"],
  [["tachimasu", "立ちます"], ["tatsu", "立つ"], ["tatte", "立って"], "to stand up"],
  [["tatemasu", "建てます"], ["tateru", "建てる"], ["tatete", "建てて"], "to build"],
  [["tabemasu", "食べます"], ["taberu", "食べる"], ["tabete", "食べて"], "to eat"],
  [["chigaimasu", "違います"], ["chigau", "違う"], ["chigatte", "違って"], "to be different, to be wrong"],
  [["tsukaimasu", "使います"], ["tsukau", "使う"], ["tsukatte", "使って"], "to use"],
  [["tsukaremasu", "疲れます"], ["tsukareru", "疲れる"], ["tsukarete", "疲れて"], "to get tired"],
  [["tsukimasu", "着きます"], ["tsuku", "着く"], ["tsuite", "着いて"], "to arrive"],
  [["tsukurimasu", "作ります"], ["tsukuru", "作る"], ["tsukutte", "作って"], "to make"],
  [["denkiotsukemasu", "電気をつけます"], ["denkiotsukeru", "電気をつける"], ["denkiotsukete", "電気をつけて"], "to switch on (a light)"],
  [["tsutaemasu", "伝えます"], ["tsutaeru", "伝える"], ["tsutaete", "伝えて"], "to pass on a message"],
  [["tsudukemasu", "続けます"], ["tsudukeru", "続ける"], ["tsudukete", "続けて"], "to continue"],
  [["dekimasu", "できます"], ["dekiru", "できる"], ["dekite", "できて"], "to be able to"],
  [["tetsudaimasu", "手伝います"], ["tetsudau", "手伝う"], ["tetsudatte", "手伝って"], "to help"],
  [["demasu", "出ます"], ["deru", "出る"], ["dete", "出て"], "to go out"],
  [["toorimasu", "通ります"], ["tooru", "通る"], ["tootte", "通って"], "to go through"],
  [["tomarimasu", "泊まります"], ["tomaru", "泊まる"], ["tomatte", "泊まって"], "to stay somewhere"],
  [["tomarimasu", "止まります"], ["tomaru", "止まる"], ["tomatte", "止まって"], "to stop"],
  [["torimasu", "取ります"], ["toru", "取る"], ["totte", "取って"], "to take"],
  [["shashinotorimasu", "写真を撮ります"], ["shashinotoru", "写真を撮る"], ["shashinototte", "写真を撮って"], "to take a photograph"],
  [["naoshimasu", "直します"], ["naosu", "直す"], ["naoshite", "直して"], "to repair"],
  [["nakimasu", "泣きます"], ["naku", "泣く"], ["naite", "泣いて"], "to cry"],
  [["makemasu", "負けます"], ["makeru", "負ける"], ["makete", "負けて"], "to lose"],
  [["nagemasu", "投げます"], ["nageru", "投げる"], ["nagete", "投げて"], "to throw"],
  [["naraimasu", "習います"], ["narau", "習う"], ["naratte", "習って"], "to learn"],
  [["narimasu", "なります"], ["naru", "なる"], ["natte", "なって"], "to become"],
  [["nugimasu", "脱ぎます"], ["nugu", "脱ぐ"], ["nuide", "脱いで"], "to take off (clothes)"],
  [["nemasu", "寝ます"], ["neru", "寝る"], ["nete", "寝て"], "to sleep, to go to bed"],
  [["noborimasu", "登ります"], ["noboru", "登る"], ["nobotte", "登って"], "to climb"],
  [["nomimasu", "飲みます"], ["nomu", "飲む"], ["nonde", "飲んで"], "to drink"],
  [["norimasu", "乗ります"], ["noru", "乗る"], ["notte", "乗って"], "to ride on a method of transport"],
  [["hairimasu", "入ります"], ["hairu", "入る"], ["haitte", "入って"], "to enter"],
  [["hakimasu", "履きます"], ["haku", "履く"], ["haite", "履いて"], "to put on (feet or legs)"],
  [["hajimemasu", "始めます"], ["hajimeru", "始める"], ["hajimete", "始めて"], "to start"],
  [["hashirimasu", "走ります"], ["hashiru", "走る"], ["hashitte", "走って"], "to run"],
  [["hatarakimasu", "働きます"], ["hataraku", "働く"], ["hataraite", "働いて"], "to work"],
  [["hanashimasu", "話します"], ["hanasu", "話す"], ["hanashite", "話して"], "to talk"],
  [["haraimasu", "払います"], ["harau", "払う"], ["haratte", "払って"], "to pay"],
  [["haremasu", "晴れます"], ["hareru", "晴れる"], ["harete", "晴れて"], "to be sunny, to clear up"],
  [["hikimasu", "弾きます"], ["hiku", "弾く"], ["hiite", "弾いて"], "to play a musical instrument"],
  [["hikimasu", "引きます"], ["hiku", "引く"], ["hiite", "引いて"], "to subtract"],
  [["hikimasu", "引きます"], ["hiku", "引く"], ["hiite", "引いて"], "to pull"],
  [["kazeohikimasu", "風邪をひきます"], ["kazeohiku", "風邪をひく"], ["kazeohiite", "風邪をひいて"], "to catch a cold"],
  [["fuemasu", "増えます"], ["fueru", "増える"], ["fuete", "増えて"], "to increase"],
  [["amegafurimasu", "雨が降ります"], ["amegafuru", "雨が降る"], ["amegafutte", "雨が降って"], "to rain"],
  [["herimasu", "減ります"], ["heru", "減る"], ["hette", "減って"], "to decrease"],
  [["magarimasu", "曲がります"], ["magaru", "曲がる"], ["magatte", "曲がって"], "to turn"],
  [["nakushimasu", "無くします"], ["nakusu", "無くす"], ["nakushite", "無くして"], "to lose"],
  [["machigaemasu", "間違えます"], ["machigaeru", "間違える"], ["machigaete", "間違えて"], "to make a mistake"],
  [["machimasu", "待ちます"], ["matsu", "待つ"], ["matte", "待って"], "to wait"],
  [["miemasu", "見えます"], ["mieru", "見える"], ["miete", "見えて"], "to be visible"],
  [["migakimasu", "磨きます"], ["migaku", "磨く"], ["migaite", "磨いて"], "to polish"],
  [["misemasu", "見せます"], ["miseru", "見せる"], ["misete", "見せて"], "to show"],
  [["mitsukemasu", "見つけます"], ["mitsukeru", "見つける"], ["mitsukete", "見つけて"], "to find"],
  [["mimasu", "見ます"], ["miru", "見る"], ["mite", "見て"], "to see, to watch, to look"],
  [["mochimasu", "持ちます"], ["motsu", "持つ"], ["motte", "持って"], "to hold, to carry"],
  [["motteikimasu", "持って行きます"], ["motteiku", "持って行く"], ["motteitte", "持って行って"], "to take something"],
  [["mottekimasu", "持って来ます"], ["mottekuru", "持って来る"], ["mottekite", "持って来て"], "to bring something"],
  [["modorimasu", "戻ります"], ["modoru", "戻る"], ["modotte", "戻って"], "to return"],
  [["moraimasu", "貰います"], ["morau", "貰う"], ["moratte", "貰って"], "to receive"],
  [["yasumimasu", "休みます"], ["yasumu", "休む"], ["yasunde", "休んで"], "to rest"],
  [["amegayamimasu", "雨が止みます"], ["amegayamu", "雨が止む"], ["amegayande", "雨が止んで"], "to stop (raining)"],
  [["yamemasu", "辞めます"], ["yameru", "辞める"], ["yamete", "辞めて"], "to quit"],
  [["yobimasu", "呼びます"], ["yobu", "呼ぶ"], ["yonde", "呼んで"], "to call"],
  [["yomimasu", "読みます"], ["yomu", "読む"], ["yonde", "読んで"], "to read"],
  [["wakarimasu", "分かります"], ["wakaru", "分かる"], ["wakatte", "分かって"], "to understand"],
  [["wasuremasu", "忘れます"], ["wasureru", "忘れる"], ["wasurete", "忘れて"], "to forget"],
  [["waraimasu", "笑います"], ["warau", "笑う"], ["waratte", "笑って"], "to laugh"],
  [["untenshimasu", "運転します"], ["untensuru", "運転する"], ["untenshite", "運転して"], "drive"],
  [["undoushimasu", "運動します"], ["undousuru", "運動する"], ["undoushite", "運動して"], "exercise"],
  [["kyanserushimasu", "キャンセルします"], ["kyanserusuru", "キャンセルする"], ["kyanserushite", "キャンセルして"], "cancel"],
  [["kopiishimasu", "コピーします"], ["kopiisuru", "コピーする"], ["kopiishite", "コピーして"], "photocopy"],
  [["shippaishimasu", "失敗します"], ["shippaisuru", "失敗する"], ["shippaishite", "失敗して"], "failure"],
  [["shoukaishimasu", "紹介します"], ["shoukaisuru", "紹介する"], ["shoukaishite", "紹介して"], "introduce"],
  [["seikoushimasu", "成功します"], ["seikousuru", "成功する"], ["seikoushite", "成功して"], "success"],
  [["setsumeishimasu", "説明します"], ["setsumeisuru", "説明する"], ["setsumeishite", "説明して"], "explain"],
  [["sentakushimasu", "洗濯します"], ["sentakusuru", "洗濯する"], ["sentakushite", "洗濯して"], "washing"],
  [["sentakushimasu", "選択します"], ["sentakusuru", "選択する"], ["sentakushite", "選択して"], "select"],
  [["chuumonshimasu", "注文します"], ["chuumonsuru", "注文する"], ["chuumonshite", "注文して"], "order"],
  [["benkyoushimasu", "勉強します"], ["benkyousuru", "勉強する"], ["benkyoushite", "勉強して"], "study"],
  [["henjishimasu", "返事します"], ["henjisuru", "返事する"], ["henjishite", "返事して"], "reply"],
  [["yakusokushimasu", "約束します"], ["yakusokusuru", "約束する"], ["yakusokushite", "約束して"], "promise"],
  [["soujishimasu", "掃除します"], ["soujisuru", "掃除する"], ["soujishite", "掃除して"], "to clean"],]

  useEffect(() => {
    let another = []
    thing.map((item) => {
      another.push([item[0][1], item[0][0], item[3]])
    })
    console.log(another)
  }, []);

  return (
    <div>
      <h3 className="top-header">Japanese Vocabulary Learning</h3>
      <div className="content-wrap">
        <div className="outer-wrap">
          <div className="question-card">
            {!gameOver && (
              <>
                <div className="current-count">
                  {currentIdx + 1} / {vocab.length}
                </div>
                <div>
                  <div className="display-text">
                    {show
                      ? japanese
                        ? vocab[qOrder[currentIdx]][0]
                        : vocab[qOrder[currentIdx]][1]
                      : vocab[qOrder[currentIdx]][2]}
                  </div>
                  <TextField
                    label={`Answer in Japanese ${
                      japanese ? "(Kana)" : "(Romaji)"
                    }`}
                    variant="standard"
                    value={input}
                    onChange={(e) =>
                      setInput(e.target.value.toLowerCase().replace(/\s/g, ""))
                    }
                    inputRef={inputField}
                    autoFocus
                    inputProps={{ maxLength: 50 }}
                  />
                </div>
              </>
            )}
            {gameOver && (
              <div>
                <div className="display-text">終わりました！</div>
                <Button variant="contained" onClick={reset}>
                  Try Again
                </Button>
              </div>
            )}
          </div>
          <div className="sidebar">
            <div>
              {!gameOver && japanese && (
                <Tooltip title="Answer in Romaji" placement="right">
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={() => setJapanese((prev) => !prev)}
                  >
                    <TranslateIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
              {!gameOver && !japanese && (
                <Tooltip title="Answer in Kana" placement="right">
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={() => setJapanese((prev) => !prev)}
                  >
                    <TranslateIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
              {!gameOver && show && (
                <Tooltip title="Hide Answer" placement="right">
                  <IconButton color="primary" size="large" onClick={hide}>
                    <VisibilityOffIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
              {!gameOver && !show && (
                <Tooltip title="Show Answer" placement="right">
                  <IconButton color="primary" size="large" onClick={reveal}>
                    <VisibilityIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
              {!gameOver && added && (
                <Tooltip title="Remove from List" placement="right">
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={removeFromList}
                  >
                    <AddCircleIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
              {!gameOver && !added && (
                <Tooltip title="Add to List" placement="right">
                  <IconButton color="primary" size="large" onClick={addToList}>
                    <AddCircleOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Download List" placement="right">
                <IconButton color="primary" size="large" onClick={download}>
                  <DownloadIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
