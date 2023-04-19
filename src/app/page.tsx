"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useHistory } from './context';
import styles from './page.module.css';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';

const API_KEY = "API_KEY_HERE"

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [inputLang, setInputLang] = useState<string>('en');
  const [outputLang, setOutputLang] = useState<string>('th');
  const [counter, setCounter] = useState<number>(0);
  const [isPalindrome, setIsPalindrome] = useState<boolean>(false);

  const { historyArray, setHistoryArray } = useHistory();

  const swapLang = () => {
    let inputL = inputLang;
    setInputLang(outputLang);
    setOutputLang(inputL);
  }

  const parlidromeCheck = () => {
    let res = false;
    let word = input.split(' ').join('');
    let reverseWord = word.split('').reverse().join('');
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (
      word === reverseWord
      && word !== ''
      && !word.includes('0')
      && !word.includes('1')
      && !word.includes('2')
      && !word.includes('3')
      && !word.includes('4')
      && !word.includes('5')
      && !word.includes('6')
      && !word.includes('7')
      && !word.includes('8')
      && !word.includes('9')
      && !format.test(word)
    ) {
      res = true;
    }
    return res;
  }

  useEffect(() => {
    setCounter(input.length);
    setIsPalindrome(parlidromeCheck);
  }, [input]);

  async function translate() {
    if (inputLang === outputLang) {
      setOutput(input);
      setHistoryArray([{
        input: input,
        output: input,
        inputLang: inputLang,
        outputLang: outputLang
      }, ...historyArray]);
    } else {
      const res = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
        q: [input],
        source: inputLang,
        target: outputLang,
        format: "text"
      });
      setOutput(res.data.data.translations[0].translatedText);
      setHistoryArray([{
        input: input,
        output: res.data.data.translations[0].translatedText,
        inputLang: inputLang,
        outputLang: outputLang
      }, ...historyArray]);
    }
  }

  const submit = async (e: any) => {
    e.preventDefault();
    translate();
  }

  const enterSubmit = (e: any) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      translate();
    }
  }

  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.header}>translator</h1>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.translation_container}>
            <div className={styles.translation_content_left}>
              <div className={styles.button_group}>
                <div>
                  <button
                    className={inputLang === 'th' ? styles.button_lang_active : styles.button_lang}
                    type="button"
                    onClick={() => { setInputLang('th'); }}
                  >
                    thai
                  </button>
                  <button
                    className={inputLang === 'en' ? styles.button_lang_active : styles.button_lang}
                    type="button"
                    onClick={() => { setInputLang('en'); }}
                  >
                    english
                  </button>
                  <button
                    className={inputLang === 'es' ? styles.button_lang_active : styles.button_lang}
                    type="button"
                    onClick={() => { setInputLang('es'); }}
                  >
                    spanish
                  </button>
                </div>
                <button
                  className={styles.button_swap}
                  type="button"
                  onClick={swapLang}
                >
                  <SwapHorizIcon />
                </button>
              </div>
              <div className={styles.input_container}>
                <textarea
                  className={styles.inputbox}
                  maxLength={1000}
                  rows={5}
                  cols={30}
                  placeholder="Enter text"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); }}
                  onKeyDown={enterSubmit}
                />
                <button
                  className={input.length > 0 ? styles.button_clear : styles.hide}
                  type="button"
                  onClick={() => { setInput(''); }}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className={styles.count}>
                {
                  isPalindrome
                    ? <span role="img" aria-label="heart">❤</span>
                    : <span role="img" aria-label="none"></span>
                }
                <div>{counter}/1000</div>
              </div>
            </div>
            <div className={styles.translation_content_right}>
              <div className={styles.button_group_output}>
                <button
                  className={outputLang === 'th' ? styles.button_lang_active : styles.button_lang}
                  type="button"
                  onClick={() => { setOutputLang('th'); }}
                >
                  thai
                </button>
                <button
                  className={outputLang === 'en' ? styles.button_lang_active : styles.button_lang}
                  type="button"
                  onClick={() => { setOutputLang('en'); }}
                >
                  english
                </button>
                <button
                  className={outputLang === 'es' ? styles.button_lang_active : styles.button_lang}
                  type="button"
                  onClick={() => { setOutputLang('es'); }}
                >
                  spanish
                </button>
              </div>
              <div className={styles.output_container}>
                <textarea
                  readOnly
                  className={styles.inputbox}
                  rows={5}
                  cols={30}
                  placeholder="Transaltion"
                  value={output}
                />
              </div>
            </div>
          </div>
          <div className={styles.submit_container}>
            <input className={styles.submit} type="submit" value="translate" />
          </div>
        </form>
        <div className={styles.link_container}>
          <Link href='/history'><HistoryIcon sx={{ fontSize: 40 }} /></Link>
        </div>
      </div>
    </main>
  )
}
