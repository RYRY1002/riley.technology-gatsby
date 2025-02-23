import * as React from "react";
import { CartesianGrid, XAxis, YAxis, Rectangle, ReferenceLine, ReferenceArea, Label } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/outlined";
import { Separator } from "@/components/ui/separator";
import { CSVLink } from "react-csv";

import { Line, LineChart } from "recharts";

import { ChartExplanation } from "@/components/ui/chart";

export function IndexHousePriceVsIndexDisposableIncome() {
  const chartData = [
    { date: "Mar-1989", housePrice: 97.90940767, disposableIncome: 94.69223992 },
    { date: "Jun-1989", housePrice: 99.65156794, disposableIncome: 97.36654922 },
    { date: "Sep-1989", housePrice: 99.65156794, disposableIncome: 96.66360149 },
    { date: "Dec-1989", housePrice: 100,         disposableIncome: 102.28133   },
    { date: "Mar-1990", housePrice: 100.6968641, disposableIncome: 103.6885193 },
    { date: "Jun-1990", housePrice: 101.3937282, disposableIncome: 103.945625  },
    { date: "Sep-1990", housePrice: 100.6968641, disposableIncome: 104.0019925 },
    { date: "Dec-1990", housePrice: 101.3937282, disposableIncome: 106.7276142 },
    { date: "Mar-1991", housePrice: 101.0452962, disposableIncome: 104.0772947 },
    { date: "Jun-1991", housePrice: 102.4390244, disposableIncome: 105.2148074 },
    { date: "Sep-1991", housePrice: 105.5749129, disposableIncome: 105.9466813 },
    { date: "Dec-1991", housePrice: 105.5749129, disposableIncome: 105.6919168 },
    { date: "Mar-1992", housePrice: 104.8780488, disposableIncome: 107.6960177 },
    { date: "Jun-1992", housePrice: 104.8780488, disposableIncome: 107.7807824 },
    { date: "Sep-1992", housePrice: 105.2264808, disposableIncome: 109.5112926 },
    { date: "Dec-1992", housePrice: 106.271777,  disposableIncome: 109.297849  },
    { date: "Mar-1993", housePrice: 107.3170732, disposableIncome: 109.9454039 },
    { date: "Jun-1993", housePrice: 108.0139373, disposableIncome: 111.4682241 },
    { date: "Sep-1993", housePrice: 108.0139373, disposableIncome: 110.4246885 },
    { date: "Dec-1993", housePrice: 109.0592334, disposableIncome: 111.8730197 },
    { date: "Mar-1994", housePrice: 110.1045296, disposableIncome: 114.2608689 },
    { date: "Jun-1994", housePrice: 111.4982578, disposableIncome: 116.8162308 },
    { date: "Sep-1994", housePrice: 113.2404181, disposableIncome: 116.3600384 },
    { date: "Dec-1994", housePrice: 112.543554,  disposableIncome: 118.1316216 },
    { date: "Mar-1995", housePrice: 113.9372822, disposableIncome: 119.1470196 },
    { date: "Jun-1995", housePrice: 112.8919861, disposableIncome: 119.4404692 },
    { date: "Sep-1995", housePrice: 113.2404181, disposableIncome: 121.7724632 },
    { date: "Dec-1995", housePrice: 112.8919861, disposableIncome: 123.244779  },
    { date: "Mar-1996", housePrice: 112.8919861, disposableIncome: 124.6558338 },
    { date: "Jun-1996", housePrice: 114.2857143, disposableIncome: 126.5083118 },
    { date: "Sep-1996", housePrice: 114.6341463, disposableIncome: 127.195256  },
    { date: "Dec-1996", housePrice: 114.9825784, disposableIncome: 129.0622956 },
    { date: "Mar-1997", housePrice: 116.0278746, disposableIncome: 130.2543723 },
    { date: "Jun-1997", housePrice: 117.4216028, disposableIncome: 131.9628296 },
    { date: "Sep-1997", housePrice: 119.5121951, disposableIncome: 132.8044373 },
    { date: "Dec-1997", housePrice: 121.9512195, disposableIncome: 133.3512924 },
    { date: "Mar-1998", housePrice: 124.738676,  disposableIncome: 132.4874384 },
    { date: "Jun-1998", housePrice: 127.5261324, disposableIncome: 133.4260302 },
    { date: "Sep-1998", housePrice: 127.5261324, disposableIncome: 136.0856734 },
    { date: "Dec-1998", housePrice: 129.6167247, disposableIncome: 134.4675492 },
    { date: "Mar-1999", housePrice: 132.0557491, disposableIncome: 135.7144977 },
    { date: "Jun-1999", housePrice: 134.8432056, disposableIncome: 140.9985627 },
    { date: "Sep-1999", housePrice: 137.630662,  disposableIncome: 141.0663156 },
    { date: "Dec-1999", housePrice: 142.1602787, disposableIncome: 143.6119511 },
    { date: "Mar-2000", housePrice: 144.5993031, disposableIncome: 145.856171  },
    { date: "Jun-2000", housePrice: 148.0836237, disposableIncome: 144.0050334 },
    { date: "Sep-2000", housePrice: 147.7351916, disposableIncome: 156.0872029 },
    { date: "Dec-2000", housePrice: 151.2195122, disposableIncome: 152.1163902 },
    { date: "Mar-2001", housePrice: 154.7038328, disposableIncome: 155.2262398 },
    { date: "Jun-2001", housePrice: 160.2787456, disposableIncome: 157.9862111 },
    { date: "Sep-2001", housePrice: 168.641115,  disposableIncome: 161.1829817 },
    { date: "Dec-2001", housePrice: 174.912892,  disposableIncome: 166.8926893 },
    { date: "Mar-2002", housePrice: 181.533101,  disposableIncome: 166.7853491 },
    { date: "Jun-2002", housePrice: 192.3344948, disposableIncome: 161.1308513 },
    { date: "Sep-2002", housePrice: 200.3484321, disposableIncome: 164.4008854 },
    { date: "Dec-2002", housePrice: 207.6655052, disposableIncome: 165.5831893 },
    { date: "Mar-2003", housePrice: 213.2404181, disposableIncome: 168.7069665 },
    { date: "Jun-2003", housePrice: 224.738676,  disposableIncome: 170.5738772 },
    { date: "Sep-2003", housePrice: 237.9790941, disposableIncome: 172.3383378 },
    { date: "Dec-2003", housePrice: 247.7351916, disposableIncome: 176.2252428 },
    { date: "Mar-2004", housePrice: 247.0383275, disposableIncome: 179.0640975 },
    { date: "Jun-2004", housePrice: 244.2508711, disposableIncome: 186.0634389 },
    { date: "Sep-2004", housePrice: 244.2508711, disposableIncome: 184.1265849 },
    { date: "Dec-2004", housePrice: 248.4320557, disposableIncome: 188.8052847 },
    { date: "Mar-2005", housePrice: 247.3867596, disposableIncome: 191.0105911 },
    { date: "Jun-2005", housePrice: 248.7804878, disposableIncome: 194.8409558 },
    { date: "Sep-2005", housePrice: 248.4320557, disposableIncome: 196.0515796 },
    { date: "Dec-2005", housePrice: 254.0069686, disposableIncome: 195.7024906 },
    { date: "Mar-2006", housePrice: 257.1428571, disposableIncome: 199.2234512 },
    { date: "Jun-2006", housePrice: 266.8989547, disposableIncome: 200.6419044 },
    { date: "Sep-2006", housePrice: 273.5191638, disposableIncome: 208.5127929 },
    { date: "Dec-2006", housePrice: 278.7456446, disposableIncome: 211.970401  },
    { date: "Mar-2007", housePrice: 281.8815331, disposableIncome: 215.3552571 },
    { date: "Jun-2007", housePrice: 293.728223,  disposableIncome: 220.9008694 },
    { date: "Sep-2007", housePrice: 304.8780488, disposableIncome: 222.2440442 },
    { date: "Dec-2007", housePrice: 317.7700348, disposableIncome: 226.7281099 },
    { date: "Mar-2008", housePrice: 319.8606272, disposableIncome: 231.5772647 },
    { date: "Jun-2008", housePrice: 317.0731707, disposableIncome: 233.5615508 },
    { date: "Sep-2008", housePrice: 309.0592334, disposableIncome: 235.6575398 },
    { date: "Dec-2008", housePrice: 304.8780488, disposableIncome: 249.4493611 },
    { date: "Mar-2009", housePrice: 302.4390244, disposableIncome: 245.4617221 },
    { date: "Jun-2009", housePrice: 314.9825784, disposableIncome: 252.2044187 },
    { date: "Sep-2009", housePrice: 328.9198606, disposableIncome: 246.1756355 },
    { date: "Dec-2009", housePrice: 347.0383275, disposableIncome: 249.8426567 },
    { date: "Mar-2010", housePrice: 359.5818815, disposableIncome: 253.4881028 },
    { date: "Jun-2010", housePrice: 364.8083624, disposableIncome: 254.791971  },
    { date: "Sep-2010", housePrice: 362.0209059, disposableIncome: 259.5940514 },
    { date: "Dec-2010", housePrice: 356.7944251, disposableIncome: 265.8044792 },
    { date: "Mar-2011", housePrice: 355.4006969, disposableIncome: 270.6947663 },
    { date: "Jun-2011", housePrice: 352.9616725, disposableIncome: 271.6947966 },
    { date: "Sep-2011", housePrice: 347.7351916, disposableIncome: 274.5764988 },
    { date: "Dec-2011", housePrice: 343.554007,  disposableIncome: 277.6861939 },
    { date: "Mar-2012", housePrice: 345.6445993, disposableIncome: 275.8418855 },
    { date: "Jun-2012", housePrice: 347.7351916, disposableIncome: 280.1417935 },
    { date: "Sep-2012", housePrice: 349.1289199, disposableIncome: 275.2978884 },
    { date: "Dec-2012", housePrice: 352.6132404, disposableIncome: 278.906322  },
    { date: "Mar-2013", housePrice: 359.2334495, disposableIncome: 282.433486  },
    { date: "Jun-2013", housePrice: 367.9442509, disposableIncome: 282.8737142 },
    { date: "Sep-2013", housePrice: 376.6550523, disposableIncome: 285.1595582 },
    { date: "Dec-2013", housePrice: 389.1986063, disposableIncome: 289.3727562 },
    { date: "Mar-2014", housePrice: 398.9547038, disposableIncome: 292.0001562 },
    { date: "Jun-2014", housePrice: 406.6202091, disposableIncome: 295.7702695 },
    { date: "Sep-2014", housePrice: 413.9372822, disposableIncome: 296.4031993 },
    { date: "Dec-2014", housePrice: 422.6480836, disposableIncome: 298.9704559 },
    { date: "Mar-2015", housePrice: 434.4947735, disposableIncome: 299.5341125 },
    { date: "Jun-2015", housePrice: 455.4006969, disposableIncome: 302.5714341 },
    { date: "Sep-2015", housePrice: 468.2926829, disposableIncome: 302.9017554 },
    { date: "Dec-2015", housePrice: 465.5052265, disposableIncome: 300.0030789 },
    { date: "Mar-2016", housePrice: 463.4146341, disposableIncome: 300.7507054 },
    { date: "Jun-2016", housePrice: 469.6864111, disposableIncome: 302.6804165 },
    { date: "Sep-2016", housePrice: 485.0174216, disposableIncome: 303.6115835 },
    { date: "Dec-2016", housePrice: 502.0905923, disposableIncome: 304.2609952 },
    { date: "Mar-2017", housePrice: 517.4216028, disposableIncome: 306.2205296 },
    { date: "Jun-2017", housePrice: 526.4808362, disposableIncome: 305.8091945 },
    { date: "Sep-2017", housePrice: 528.2229965, disposableIncome: 306.195522  },
    { date: "Dec-2017", housePrice: 525.4355401, disposableIncome: 311.4937942 },
    { date: "Mar-2018", housePrice: 524.738676,  disposableIncome: 313.6201947 },
    { date: "Jun-2018", housePrice: 519.5121951, disposableIncome: 314.7363274 },
    { date: "Sep-2018", housePrice: 510.8013937, disposableIncome: 315.6299917 },
    { date: "Dec-2018", housePrice: 495.4703833, disposableIncome: 319.3956583 },
    { date: "Mar-2019", housePrice: 486.7595819, disposableIncome: 321.760062  },
    { date: "Jun-2019", housePrice: 486.0627178, disposableIncome: 320.4864444 },
    { date: "Sep-2019", housePrice: 505.9233449, disposableIncome: 327.3695192 },
    { date: "Dec-2019", housePrice: 529.2682927, disposableIncome: 325.8408101 },
    { date: "Mar-2020", housePrice: 541.4634146, disposableIncome: 331.7973161 },
    { date: "Jun-2020", housePrice: 529.6167247, disposableIncome: 341.6753863 },
    { date: "Sep-2020", housePrice: 532.7526132, disposableIncome: 351.2470967 },
    { date: "Dec-2020", housePrice: 554.3554007, disposableIncome: 343.8725859 },
    { date: "Mar-2021", housePrice: 600.3484321, disposableIncome: 350.929968  },
    { date: "Jun-2021", housePrice: 641.8118467, disposableIncome: 347.4979309 },
    { date: "Sep-2021", housePrice: 675.9581882, disposableIncome: 363.5222501 },
    { date: "Dec-2021", housePrice: 703.1358885, disposableIncome: 359.5165331 },
    { date: "Mar-2022", housePrice: 714.9825784, disposableIncome: 366.0748175 },
    { date: "Jun-2022", housePrice: 703.8327526, disposableIncome: 365.5383851 },
    { date: "Sep-2022", housePrice: 672.1254355, disposableIncome: 371.2339236 },
    { date: "Dec-2022", housePrice: 655.7491289, disposableIncome: 365.0648434 },
    { date: "Mar-2023", housePrice: 663.7630662, disposableIncome: 366.8508437 },
    { date: "Jun-2023", housePrice: 690.5923345, disposableIncome: 368.3684707 },
    { date: "Sep-2023", housePrice: 709.4076655, disposableIncome: 366.111843  }
  ]

  const chartConfig = {
    housePrice: {
      label: "Indexed house price",
      color: "var(--chart-1)",
    },
    disposableIncome: {
      label: "Indexed household disposable income per capita",
      color: "var(--chart-2)",
    }
  } //satisfies ChartConfig;

  const getAxisYDomain = (from, to, ref, offset) => {
    const refData = chartData.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });
  
    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  const [highlightState, setHighlightState] = React.useState({
    refAreaLeft: null,
    refAreaLeftPayload: null,
    refAreaRight: null,
    refAreaRightPayload: null,
    mouseDown: false
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="lg:text-2xl">
          House prices outpace disposable income after capital gains tax was halved
          <ChartExplanation dialog={{content: "Both of the series in this graph are indexes. This means that they are relative, in this case to 1989-90. An index of 200 means they are 2x more than in 1989-90. This chart shows that prior to negative gearing, house prices stayed roughly inline with disposable income. After negative gearing, house prices vastly outpace disposable income, meaning they're unaffordable for most people.", button: "Got it"}}/>
        </CardTitle>
        <CardDescription>1989-90 = 100</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer config={chartConfig} className="min-h-96">
          <LineChart
            accessibilityLayer 
            data={chartData}
            onMouseDown={(e) => setHighlightState(a => ({ ...a, refAreaLeft: e.activeLabel, refAreaLeftPayload: e.activePayload[0].payload }))}
            onMouseMove={(e) => highlightState.refAreaLeft && setHighlightState(a => ({ ...a, refAreaRight: e.activeLabel, refAreaRightPayload: e.activePayload[0].payload, mouseDown: true }))}
            onMouseUp={() => setHighlightState(a => ({ ...a, refAreaLeft: null, refAreaLeftPayload: null, refAreaRight: null, refAreaRightPayload: null, mouseDown: false }))}>
            <CartesianGrid vertical={false}/>
            <XAxis 
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value).getFullYear().toString()
              }}
              interval="equidistantPreserveStart"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              ticks={[100, 300, 500, 700]}
              domain={[0, 725]}
            />
            <ChartTooltip
              content={highlightState.mouseDown ? (
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-AU", {
                      day: undefined,
                      month: "short",
                      year: "numeric"
                    })
                  }}
                  valueFormatter={(value, name, item, index) => {
                    if (highlightState.refAreaRightPayload[name] > highlightState.refAreaLeftPayload[name]) {
                      return (highlightState.refAreaRightPayload[name] / highlightState.refAreaLeftPayload[name]).toFixed(2)
                    } else if (highlightState.refAreaLeftPayload[name] > highlightState.refAreaRightPayload[name]) {
                      return (highlightState.refAreaLeftPayload[name] / highlightState.refAreaRightPayload[name]).toFixed(2)
                    }
                  }}
                  unit="x"
                />
              ) : (
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-AU", {
                      day: undefined,
                      month: "short",
                      year: "numeric"
                    })
                  }}
                />
              )}
              cursor={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="housePrice"
              type="linear"
              stroke="var(--color-housePrice)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="disposableIncome"
              type="linear"
              stroke="var(--color-disposableIncome)"
              strokeWidth={2}
              dot={false}
            />
            <ReferenceLine
              x="Jun-2000"
              strokeDasharray="3 3"
              label="Capital gains tax halved"
            />
            {highlightState.mouseDown && (
              <ReferenceArea x1={highlightState.refAreaLeft} x2={highlightState.refAreaRight} strokeOpacity={0.3}/>
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex w-full items-start gap-2 text-sm justify-between">
        <CardDescription className="text-[var(--muted-foreground)] hover:text-[var(--tw-prose-links)]">
          <CSVLink
            data={chartData}
            headers={[
              { label: "Date", key: "date"},
              { label: "Dwelling prices index", key: "housePrice"},
              { label: "Household disposable income per capita index", key: "disposableIncome"}]}
            enclosingCharacter=""
            filename="Dwelling prices index vs household disposable income per capita index.csv">Get the data</CSVLink>
        </CardDescription>
        <CardDescription>Source: ABS, BIS</CardDescription>
      </CardFooter>
    </Card>
  )
}

export function IncreaseInCapitalGainAfterHalving() {
  const chartData = [
    { date: "1986", capitalGain: 4092.98629,  },
    { date: "1987", capitalGain: 4846.974103  },
    { date: "1988", capitalGain: 6403.908365  },
    { date: "1989", capitalGain: 5410.171806  },
    { date: "1990", capitalGain: 4587.728606  },
    { date: "1991", capitalGain: 4538.936959  },
    { date: "1992", capitalGain: 4505.34786   },
    { date: "1993", capitalGain: 5884.76473,  rentalLoss: 3745.985372 },
    { date: "1994", capitalGain: 4980.076686, rentalLoss: 4175.346759 },
    { date: "1995", capitalGain: 5232.152623, rentalLoss: 4612.054065 },
    { date: "1996", capitalGain: 4720.126546, rentalLoss: 4269.940034 },
    { date: "1997", capitalGain: 6015.068712, rentalLoss: 3868.830235 },
    { date: "1998", capitalGain: 6345.470053, rentalLoss: 3841.840237 },
    { date: "1999", capitalGain: 6134.084806, rentalLoss: 4222.180297 },
    { date: "2000", capitalGain: 4254.500966, rentalLoss: 5008.226652 },
    { date: "2001", capitalGain: 5993.448894, rentalLoss: 4901.996085 },
    { date: "2002", capitalGain: 8621.8848,   rentalLoss: 5541.269607 },
    { date: "2003", capitalGain: 10823.82699, rentalLoss: 6601.01517  },
    { date: "2004", capitalGain: 11001.42637, rentalLoss: 7679.001864 },
    { date: "2005", capitalGain: 13854.39938, rentalLoss: 8400.507047 },
    { date: "2006", capitalGain: 18869.33668, rentalLoss: 9357.281878 },
    { date: "2007", capitalGain: 17309.01229, rentalLoss: 10768.28607 },
    { date: "2008", capitalGain: 20358.12739, rentalLoss: 10187.5547  },
    { date: "2009", capitalGain: 20647.6938,  rentalLoss: 9223.541143 },
    { date: "2010", capitalGain: 21351.4307,  rentalLoss: 11019.40196 },
    { date: "2011", capitalGain: 21949.76458, rentalLoss: 10954.98046 },
    { date: "2012", capitalGain: 20268.64048, rentalLoss: 9605.592935 },
    { date: "2013", capitalGain: 24014.14985, rentalLoss: 8760.222669 },
    { date: "2014", capitalGain: 26457.12661, rentalLoss: 8729.50413  },
    { date: "2015", capitalGain: 27882.79218, rentalLoss: 8797.098454 },
    { date: "2016", capitalGain: 29524.86929, rentalLoss: 8734.537413 },
    { date: "2017", capitalGain: 31315.10371, rentalLoss: 9164.18079  },
    { date: "2018", capitalGain: 27568.51882, rentalLoss: 9146.210062 },
    { date: "2019", capitalGain: 25302.37281, rentalLoss: 8097.070292 },
    { date: "2020", capitalGain: 28453.22474, rentalLoss: 6969.121989 }
  ]

  const chartConfig = {
    capitalGain: {
      label: "Capital gains tax revenue",
      color: "var(--chart-1)",
    },
    rentalLoss: {
      label: "Rental losses",
      color: "var(--chart-2)",
    }
  } satisfies ChartConfig;

  const [activeChart, setActiveChart] =
    React.useState<"capitalGain" | "rentalLoss">("capitalGain");

  const total = React.useMemo(
    () => ({
      capitalGain: chartData.reduce((acc, curr) => acc + curr.capitalGain, 0),
      rentalLoss: chartData.reduce((acc, curr) => acc + curr.rentalLoss, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="lg:text-2xl">{activeChart === "capitalGain" ? "Capital gains tax revenue" : "Rental losses"} skyrocket{activeChart == "capitalGain" && "s"} after {activeChart === "capitalGain" ? "it" : "capital gains tax"} was halved</CardTitle>
          {/*activeChart === "capitalGain" && (
            <ChartExplanation dialog={{content: "The revenue from capital gains tax skyrockets after the tax was halved, implying that many many people are exploiting the negative gearing loophhole.", button: "Got it"}}/>
          )*/}
        </div>
        <div className="flex">
          {["capitalGain", "rentalLoss"].map((key) => {
            const chartType = key as "capitalGain" | "rentalLoss"
            return (
              <button
                key={chartType}
                data-active={activeChart === chartType}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chartType)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartType === "capitalGain" ? "Capital gains tax revenue" : "Rental losses"}
                </span>
                <span className="text-lg font-mono font-extrabold leading-none sm:text-3xl">
                  {chartType === "capitalGain" ? "668%" : "220%*"}<MaterialSymbol icon="trending_up" fill grade={-25} className="pl-1 text-lg sm:text-3xl"/>
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              interval="equidistantPreserveStart"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              unit="$"
            />
            <ChartTooltip
              content={<ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).getFullYear().toString()
                }}
                unit="$"
                />
              }
              cursor={false}
            />
            {activeChart === "capitalGain" ? <>
              <Line
                dataKey="capitalGain"
                type="natural"
                stroke="var(--color-capitalGain)"
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine
                strokeDasharray="3 3"
                label="Up 668%"
                segment={[{ x: "2000", y: 4254.500966 }, {x: "2020", y: 28453.22474 }]}
              />
            </> : <>
              <Line
                dataKey="rentalLoss"
                type="natural"
                stroke="var(--color-rentalLoss)"
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine
                strokeDasharray="3 3"
                label="Up 133%"
                segment={[{ x: "2000", y: 5008.226652 }, {x: "2020", y: 6969.121989 }]}
              />
            </>}
            <ReferenceLine
              x="2000"
              strokeDasharray="3 3"
              label="Capital gains tax halved"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex w-full items-start gap-2 text-sm justify-between">
        <CardDescription className="text-[var(--muted-foreground)] hover:text-[var(--tw-prose-links)]">
          <CSVLink
            data={chartData}
            headers={[
              { label: "Date", key: "date"},
              { label: "Capital gains tax revenue", key: "capitalGain"},
              { label: "Rental losses", key: "rentalLoss"}]}
            enclosingCharacter=""
            filename="Capital gains tax revenue and rental losses.csv">Get the data</CSVLink>
        </CardDescription>
        <div className="flex flex-col items-start">
          <CardDescription>Source: ATO 2020-21 Tax State, Table 1, derived</CardDescription>
          {activeChart === "rentalLoss" && (
            <CardDescription className="italic">*220% is between 2000 (when captial gains tax was halved) and 2011.</CardDescription>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

import { Bar, BarChart } from "recharts";

export function BeneficiariesOfCapitalGainsByIncomeDecile() {
  const chartData = [
    { incomeDecile: "Lowest",  capitalGainsDiscount: 0.3429,   negativeGearing: 1.2195  },
    { incomeDecile: "2nd",     capitalGainsDiscount: 0.09525,  negativeGearing: 0.7317  },
    { incomeDecile: "3rd",     capitalGainsDiscount: 0.17145,  negativeGearing: 0.9214  },
    { incomeDecile: "4th",     capitalGainsDiscount: 0.1905,   negativeGearing: 1.1111  },
    { incomeDecile: "5th",     capitalGainsDiscount: 0.2667,   negativeGearing: 1.5176  },
    { incomeDecile: "6th",     capitalGainsDiscount: 0.28575,  negativeGearing: 1.6802  },
    { incomeDecile: "7th",     capitalGainsDiscount: 0.40005,  negativeGearing: 2.168   },
    { incomeDecile: "8th",     capitalGainsDiscount: 0.59055,  negativeGearing: 3.0894  },
    { incomeDecile: "9th",     capitalGainsDiscount: 1.1049,   negativeGearing: 4.5799  },
    { incomeDecile: "Highest", capitalGainsDiscount: 15.56385, negativeGearing: 10.0812 }
  ]

  const chartConfig = {
    capitalGain: {
      label: "Capital gains tax discount",
      color: "var(--chart-1)",
    },
    negativeGearing: {
      label: "Negative gearing",
      color: "var(--chart-2)",
    }
  } satisfies ChartConfig;

  const [activeChart, setActiveChart] =
    React.useState<"capitalGain" | "negativeGearing">("capitalGain");

  const total = React.useMemo(
    () => ({
      capitalGain: chartData.reduce((acc, curr) => acc + curr.capitalGainsDiscount, 0),
      rentalLoss: chartData.reduce((acc, curr) => acc + curr.negativeGearing, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="lg:text-2xl">The richest <span className="font-mono font-extrabold">{activeChart === "capitalGain" ? "10%" : "20%"}</span> get <span className="font-mono font-extrabold">{activeChart === "capitalGain" ? "82%" : "54%"}</span> of benefits</CardTitle>
        </div>
        <div className="flex">
          {["capitalGain", "negativeGearing"].map((key) => {
            const chartType = key as "capitalGain" | "negativeGearing"
            return (
              <button
                key={chartType}
                data-active={activeChart === chartType}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chartType)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartType === "capitalGain" ? "Capital gains tax discount" : "Negative gearing"}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="incomeDecile"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              interval="equidistantPreserveStart"
              label={{value: "Taxable income decile", position: "insideBottom", offset: -5}}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              unit="bn"
            />
            <ChartTooltip
              content={<ChartTooltipContent
                  unit={{ before: "$", after: "bn" }}
                />
              }
              cursor={false}
            />
            {activeChart === "capitalGain" ? <>
              <Bar
                dataKey="capitalGainsDiscount"
                type="natural"
                fill="var(--color-capitalGain)"
                strokeWidth={2}
              />
              <ReferenceLine
                strokeDasharray="3 3"
                label="Up 668%"
                segment={[{ x: "2000", y: 4254.500966 }, {x: "2020", y: 28453.22474 }]}
              />
            </> : <>
              <Bar
                dataKey="negativeGearing"
                type="natural"
                fill="var(--color-negativeGearing)"
                strokeWidth={2}
              />
              <ReferenceLine
                strokeDasharray="3 3"
                label="Up 133%"
                segment={[{ x: "2000", y: 5008.226652 }, {x: "2020", y: 6969.121989 }]}
              />
            </>}
            <ReferenceLine
              x="2000"
              strokeDasharray="3 3"
              label="Capital gains tax halved"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex w-full items-start gap-2 text-sm justify-between">
        <CardDescription className="text-[var(--muted-foreground)] hover:text-[var(--tw-prose-links)]">
          <CSVLink
            data={chartData}
            headers={[
              { label: "Income decile", key: "incomeDecile"},
              { label: "Capital gains tax discount", key: "capitalGainsDiscount"},
              { label: "Negative gearing", key: "negativeGearing"}]}
            enclosingCharacter=""
            filename="Beneficiaries of capital gains discounts by taxable income decile.csv">Get the data</CSVLink>
        </CardDescription>
        <CardDescription>Source: 2022-23 Tax Expenditure and Insights Statements, {activeChart === "capitalGain" ? "Fig 2.6" : "2.22"}</CardDescription>
      </CardFooter>
    </Card>
  )
}