import React, { useState, useEffect, useRef } from "react"
import './App.css'
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import DownloadIcon from '@mui/icons-material/Download'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import TranslateIcon from '@mui/icons-material/Translate';
import IconButton from "@mui/material/IconButton"
import { vocab } from "./vocab"
import Canvas from "./Canvas"

function App() {
    const [input, setInput] = useState("")
    const [japanese, setJapanese] = useState(false)
    const [qOrder, setQOrder] = useState(shuffle([...Array(vocab.length).keys()]))
    const [currentIdx, setCurrentIdx] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [added, setAdded] = useState(false)
    const [list, setList] = useState([])
    const [show, setShow] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const inputField = useRef()
    
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

    useEffect(() => {
        window.addEventListener("keydown", function handler(e) {
            if (inputField.current !== null) {
                if (/[a-zA-Z. ]/.test(e.key)) {
                    inputField.current.focus()
                }
                switch (e.code) {
                    case "Escape":
                        inputField.current.blur()
                        break
                    default:
                        break
                }
            }
        })
    }, [])

    function shuffle(array) {
        var m = array.length, t, i
        while (m) {
            i = Math.floor(Math.random() * m--)
            t = array[m]
            array[m] = array[i]
            array[i] = t
        }
        return array
    }

    function reset() {
        setGameOver(false)
        setQOrder(shuffle([...Array(vocab.length).keys()]))
        setCurrentIdx(0)
    }

    function addToList() {
        setList(prev => ([
            ...prev,
            qOrder[currentIdx]
        ]))
        setAdded(true)
    }

    function removeFromList() {
        let index = list.indexOf(qOrder[currentIdx])
        if (index > -1) {
            list.splice(index, 1)
        }
        setAdded(false)
    }

    function reveal() {
        setShow(true)
    }

    function hide() {
        setShow(false)
    }

    function download() {
        const element = document.createElement("a")
        let string = `Meaning\t\t\t\tRomaji\t\t\tKana\n------------------------------------------------------------\n`
        for (let i = 0; i < list.length; i++) {
            if (vocab[list[i]][2].length < 8) {
                if (vocab[list[i]][1].length < 8) {
                    string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t\t\t${vocab[list[i]][0]}\n`
                } else if (vocab[list[i]][1].length < 16) {
                    string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t\t${vocab[list[i]][0]}\n`
                } else if (vocab[list[i]][1].length < 24) {
                    string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t${vocab[list[i]][0]}\n`
                } else {
                    string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}${vocab[list[i]][0]}\n`
                }
            } else if (vocab[list[i]][2].length < 16) {
                if (vocab[list[i]][1].length < 8) {
                    string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t\t\t${vocab[list[i]][0]}\n`
                } else if (vocab[list[i]][1].length < 16) {
                    string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t\t${vocab[list[i]][0]}\n`
                } else if (vocab[list[i]][1].length < 24) {
                    string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t${vocab[list[i]][0]}\n`
                } else {
                    string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}${vocab[list[i]][0]}\n`
                }
            } else if (vocab[list[i]][2].length < 24) {
                if (vocab[list[i]][1].length < 8) {
                    string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t\t\t${vocab[list[i]][0]}\n`
                } else if (vocab[list[i]][1].length < 16) {
                    string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t\t${vocab[list[i]][0]}\n`
                } else if (vocab[list[i]][1].length < 24) {
                    string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t${vocab[list[i]][0]}\n`
                } else {
                    string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}${vocab[list[i]][0]}\n`
                }
            } else {
                if (vocab[list[i]][1].length < 8) {
                    string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t\t\t${vocab[list[i]][0]}\n`
                } else if (vocab[list[i]][1].length < 16) {
                    string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t\t${vocab[list[i]][0]}\n`
                } else if (vocab[list[i]][1].length < 24) {
                    string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t${vocab[list[i]][0]}\n`
                } else {
                    string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}${vocab[list[i]][0]}\n`
                }
            }
        }
        const blob = new Blob([string], {type: "text/plain; charset=utf-8"})
        element.href = URL.createObjectURL(blob)
        element.download = "added.txt"
        document.body.appendChild(element)
        element.click()
    }

    useEffect(() => {
        if (!gameOver) {
            if (japanese 
                ? input === vocab[qOrder[currentIdx]][0]
                : input === vocab[qOrder[currentIdx]][1]
                ) {
                setCurrentIdx(prev => prev + 1)
                setInput("")
                if (currentIdx >= vocab.length - 1) {
                    setJapanese(false)
                    setGameOver(true)
                }
            }
            if (list.includes(qOrder[currentIdx])) {
                setAdded(true)
            } else {
                setAdded(false)
            }
        }
    }, [input, qOrder, currentIdx, list, gameOver, japanese])

    useEffect(() => {
        setShow(false)
    }, [currentIdx])

    return (
        <div>
            <h3 className="top-header">
                Japanese Vocabulary Learning
            </h3>
            <div className="content-wrap">
                
                <div 
                    className="outer-wrap"
                    style={{
                        marginLeft: 
                        width <= 768
                        ? 0
                        : japanese ? 0 : 380
                    }}
                >
                    <div className="question-card">

                        {!gameOver &&
                            <>
                                <div className="current-count">{currentIdx + 1} / {vocab.length}</div>
                                <div>
                                    <div className="display-text">
                                        {
                                            show 
                                            ? japanese 
                                                ? vocab[qOrder[currentIdx]][0] 
                                                : vocab[qOrder[currentIdx]][1]
                                            : vocab[qOrder[currentIdx]][2]
                                        }
                                    </div>
                                    <TextField 
                                        label={`Answer in Japanese ${japanese ? "(Kana)" : "(Romaji)"}`}
                                        variant="standard"
                                        value={input}
                                        onChange={e => setInput(e.target.value.toLowerCase().replace(/\s/g,''))}
                                        inputRef={inputField}
                                        autoFocus
                                        inputProps={{ maxLength: 25 }}
                                    />
                                </div>
                            </>
                        }
                        {gameOver &&
                            <div>
                                <div className="display-text">終わりました！</div>
                                <Button 
                                    variant="contained"
                                    onClick={reset}
                                >
                                    Try Again
                                </Button>
                            </div>
                        }
                    </div>
                    <div className="sidebar">
                        <div>
                            {(!gameOver && japanese) &&
                                <Tooltip title="Answer in Romaji" placement="right">
                                    <IconButton
                                        color="primary" 
                                        size="large"
                                        onClick={() => setJapanese(prev => !prev)}
                                    >
                                        <TranslateIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            }
                            {(!gameOver && !japanese) &&
                                <Tooltip title="Answer in Kana" placement="right">
                                    <IconButton
                                        color="primary" 
                                        size="large"
                                        onClick={() => setJapanese(prev => !prev)}
                                    >
                                        <TranslateIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            }
                            {(!gameOver && show) &&
                                <Tooltip title="Hide Answer" placement="right">
                                    <IconButton
                                        color="primary" 
                                        size="large"
                                        onClick={hide}
                                    >
                                        <VisibilityOffIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            }
                            {(!gameOver && !show) &&
                                <Tooltip title="Show Answer" placement="right">
                                    <IconButton
                                        color="primary"
                                        size="large"
                                        onClick={reveal}
                                    >
                                        <VisibilityIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            }
                            {(!gameOver && added) && 
                                <Tooltip title="Remove from List" placement="right">
                                    <IconButton 
                                        color="primary" 
                                        size="large"
                                        onClick={removeFromList}
                                    >
                                        <AddCircleIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            }
                            {(!gameOver && !added) &&
                                <Tooltip title="Add to List" placement="right">
                                    <IconButton 
                                        color="primary" 
                                        size="large"
                                        onClick={addToList}
                                    >
                                        <AddCircleOutlineIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            }
                            <Tooltip title="Download List" placement="right">
                                <IconButton 
                                    color="primary" 
                                    size="large"
                                    onClick={download}
                                >
                                    <DownloadIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <Canvas setInput={setInput} japanese={japanese} />

            </div>
        </div>
    )
}

export default App