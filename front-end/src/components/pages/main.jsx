import { useState, useEffect } from "react"
import Stock from "../elements/stock"
import Stocks from "../../utils/stock"
import progressing from "../../assets/svgs/progressing.svg"
import Tweet from "../elements/tweet"
import Mask from "../layout/mask"

const Main = () => {
  const [stocks, setStocks] = useState([])
  const [selectedStock, setSelectedStock] = useState(0)
  const [customImageSrc, setCustomImageSrc] = useState()
  const [isCustomImage, setIsCustomImage] = useState(false)
  const [isAddStock, setIsAddStock] = useState(false)
  const [isShare, setIsShare] = useState(false)

  useEffect(() => {
    setStocks([...Stocks])
  }, [])

  const handleFileChangeImage = (e) => {
    const file = e.target.files[0]

    if (file) {
      setIsCustomImage(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        let src = reader.result
        if (src.split(':')[1].split('/')[0] !== 'image') return
        setCustomImageSrc(src)
      }
      reader.readAsDataURL(file)
    }
    setIsCustomImage(false)
  }

  const handleFileAddStock = (e) => {
    const file = e.target.files[0]

    if (file) {
      setIsAddStock(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        let src = reader.result
        if (src.split(':')[1].split('/')[0] !== 'image') return
        let tempStocks = stocks
        tempStocks.splice(0, 0, { src: src })
        console.log(tempStocks)
        setStocks([...tempStocks])
        setSelectedStock(0)
      }
      reader.readAsDataURL(file)
    }
    setIsAddStock(false)
  }

  const generateImage = () => {
    setIsShare(true)
  }

  return (
    <>
      {
        isShare && <>
          <Mask></Mask>
          <Tweet func={() => setIsShare(false)} src={customImageSrc}></Tweet>
        </>
      }
      <div className="main-page relative">
        <div className="main-container">
          <div className="image-face-swap">
            <div className="swap-container mx-auto relative min-[720px]:pr-[460px]">
              <div className="max-[1440px]:max-w-[700px] mx-auto min-[720px]:overflow-x-auto">
                <div className="cursor-pointer active-image face-swap mx-auto mt-8 w-[150px] text-center pb-5">Face Swap</div>
                <div className="swap-content flex gap-12 min-[720px]:my-16 justify-center">
                  <div className="swap-left max-[720px]:w-full w-[250px] h-[250px] min-[720px]:bg-gray-100 rounded-2xl flex justify-around max-[720px]:justify-between max-[720px]:mx-14 max-[720px]:mt-6 max-[720px]:mb-2 gap-2 items-center">
                    <div className="custom text-center relative">
                      <div onChange={handleFileChangeImage} className="custom-image max-[720px]:w-[140px] max-[720px]:h-[140px] w-[90px] h-[90px] mb-3 relative">
                        <input id="inputFileImage" type="file" accept="image/*" className="opacity-0 w-[90px] h-[90px] cursor-pointer" />
                        {
                          customImageSrc &&
                          <>
                            <img src={customImageSrc} alt="custom" className="w-[inherit] absolute top-0 h-[inherit] rounded-xl object-cover" />
                            <img onClick={() => { document.getElementById('inputFileImage').click() }} src="assets/edit-icon.png" alt="edit tool icon" className="absolute top-[-5%] right-[-5%] w-6 h-6 cursor-pointer"></img>
                          </>
                        }
                      </div>
                      {
                        isCustomImage &&
                        <div className="absolute flex top-0 max-[720px]:w-[140px] max-[720px]:h-[140px] w-[90px] h-[90px] justify-center items-center">
                          <img className="w-[60%]" src={progressing} alt="" />
                        </div>
                      }
                      <span>{customImageSrc ? 'Source Face' : 'Add Face'}</span>
                    </div>
                    <div className="w-4 h-4 mb-8 right-arrow"></div>
                    <div className="original text-center">
                      <div className='original-image max-[720px]:w-[140px] max-[720px]:h-[140px] w-[90px] h-[90px] mb-3 bg-gray-300 rounded-xl'>
                        <img className="w-full h-full object-cover rounded-xl" src={stocks.length && stocks[0] && stocks[selectedStock].src} alt="original" />
                      </div>
                      <span>Original</span>
                    </div>
                  </div>
                  <div className='min-[720px]:block hidden swap-right w-[250px] h-[250px] bg-gray-100 rounded-2xl'
                  >
                    <img className="w-full h-full object-cover rounded-2xl" src={stocks.length && stocks[0] && stocks[selectedStock].src} alt="original" />
                  </div>
                </div>
                <div onClick={generateImage} className={customImageSrc ? "mx-auto max-[720px]:w-[86%] w-[629px] min-[720px]:min-w-[629px] swap-button active bg-[#d8d8d8] p-7 max-[720px]:py-4 rounded-lg text-center text-white" : "max-[720px]:w-[86%] mx-auto min-[720px]:min-w-[629px] w-[629px] swap-button bg-[#d8d8d8] p-7 max-[720px]:py-4 rounded-lg text-center text-white"}>
                  Generate
                </div>
              </div>
            </div>
            <div className="min-[720px]:absolute right-8 top-0 mt-8 stock-container min-[720px]:w-[465px] h-[520px] min-[720px]:overflow-y-auto max-[720px]:h-auto min-[720px]:border-x-2 bg-gray-100 max-[720px]:overflow-x-auto max-[720px]:p-[30px]">
              <div className="stock-content min-[720px]:ml-8 min-[720px]:mr-4 mt-4">
                <div className="stock-title">
                  Upload a photo or select from templates to remodel
                </div>
                <div className="stock-body pt-7">
                  <div className="stocks flex flex-wrap max-[720px]:max-h-[326px] max-[720px]:flex-col gap-5 relative max-[720px]:w-full">
                    <div onChange={handleFileAddStock} className="bg-gray-50 max-[720px]:w-[90px] max-[720px]:h-[90px] w-[120px] h-[120px] rounded-lg add-image">
                      <input type="file" accept="image/*" className="opacity-0 max-[720px]:w-[90px] max-[720px]:h-[90px] w-[120px] h-[120px] cursor-pointer" />
                    </div>
                    {
                      isAddStock &&
                      <div className="absolute flex top-0 max-[720px]:w-[90px] max-[720px]:h-[90px] w-[120px] h-[120px] justify-center items-center">
                        <img className="w-[60%]" src={progressing} alt="" />
                      </div>
                    }
                    {
                      stocks.map((stock, key) => {
                        return (
                          <Stock key={key} func={() => setSelectedStock(key)} className={key === selectedStock ? 'bg-gray-50 max-[720px]:w-[90px] max-[720px]:h-[90px] w-[120px] h-[120px] rounded-lg cursor-pointer active' : 'bg-gray-50 max-[720px]:w-[90px] max-[720px]:h-[90px] w-[120px] h-[120px] rounded-lg cursor-pointer'}
                            style={stock.src}></Stock>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="video-face-swap">
            <div className="swap-container px-10 py-5">
              <div className="flex w-full p-4">
                {/* <div className="cursor-pointer active-image face-swap">Video Face Swap</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main