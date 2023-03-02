
import React from 'react'
import sampleApi from '../../../../services/api/sampleApi'

// 說明 Component 使用時機：
// - 不是只有因為需要共用才需要拆 Component 出來
// - 當頁面邏輯太複雜，也可以拆出 Component 降低頁面複雜度

interface IProps {
  width: number,
  height: number
};

const SampleImg = (props: IProps) => {
  // call query api (cached) - 直接執行
  const { data: base64Img/*, isLoading, isError, refetch */ } =
    sampleApi.useSampleGetImgQuery({ height: props.height, width: props.width }, {
      // pollingInterval: 60_000 // pull data every 1 minute
    })
  return (
    <img alt='' src={base64Img} />
  )
}

export default SampleImg
