"use client";
import { useHistory } from '../context';
import Link from 'next/link';
import styles from './page.module.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface historyData {
    input: string,
    output: string,
    inputLang: string,
    outputLang: string
}

export default function History() {
    const { historyArray, setHistoryArray } = useHistory();

    function ChangeLangSymbol(lang: string) {
        if (lang === "th") {
            return "thai"
        } else if (lang === "en") {
            return "english"
        } else {
            return "spanish"
        }
    }

    return (
        <div className={styles.page_bg}>
            <div className={styles.header_container}>
                <Link href="/"><ArrowBackIcon /></Link>
                <h1 className={styles.header}>history</h1>
            </div>
            <div className={styles.history_container}>
                <div className={styles.history_content}>
                    <div className={styles.flex_end}>
                        <button
                            className={styles.button_clear_all}
                            type="button"
                            onClick={() => { setHistoryArray([]); }}
                        >
                            clear all history
                        </button>
                    </div>
                    {
                        historyArray?.filter((data: historyData) => (data.input !== '')).map((el: historyData, index: number) => (
                            <div className={styles.history_list} key={index}>
                                <div>
                                    <div className={styles.lang}>
                                        <span>{ChangeLangSymbol(el.inputLang)}</span>
                                        <ArrowRightAltIcon />
                                        <span>{ChangeLangSymbol(el.outputLang)}</span>
                                    </div>
                                    <div className={styles.trans_res}>
                                        <div className={styles.input}>{el.input}</div>
                                        <div className={styles.output}>{el.output}</div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className={styles.button_clear}
                                        type="button"
                                        onClick={() => {
                                            setHistoryArray([...historyArray.slice(0, index), ...historyArray.slice(index + 1)]);
                                        }}
                                    >
                                        delete
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}