import * as React from "react";

import { 
  MediaPlayer,
  MediaProvider,
  MediaAnnouncer,
  Gesture,
  Spinner,
  Captions,
  Controls,
  TimeSlider,
  PlayButton,
  Time,
  MuteButton,
  VolumeSlider,
  LiveButton,
  Title,
  ChapterTitle,
  CaptionButton,
  Thumbnail,
  SpeedSlider,
  AudioGainSlider,
  AirPlayButton,
  GoogleCastButton,
  FullscreenButton,
  Poster,
  useChapterTitle,
  Track,
} from "@vidstack/react";
import { type MediaPlayerInstance, TimeSliderInstance, useMediaState, useActiveTextTrack, useCaptionOptions, useChapterOptions, isTrackCaptionKind, useMediaContext, usePlaybackRateOptions, useAudioOptions, useAudioGainOptions, useVideoQualityOptions, getDownloadFile, useMediaStore, useMediaRemote } from "@vidstack/react";
import { useDefaultLayoutContext } from "E:/Stuff/riley.technology/gatsby/node_modules/@vidstack/react/prod/player/vidstack-default-layout.js";
//import { useActive } from "E:/Stuff/riley.technology/gatsby/node_modules/@vidstack/react/prod/chunks/vidstack-DzQtn4XB.js";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, ButtonDiv } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSliderItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { MaterialSymbol } from "gatsby-plugin-material-symbols";

import type { DefaultLayoutProps, MediaPlayerProps, MediaProviderProps, TrackProps, CaptionsProps } from "@vidstack/react";

interface UseCustomState<T> {
  (): T;
  set: React.Dispatch<React.SetStateAction<T>>;
}
function useCustomState<T>(defaultValue: T): UseCustomState<T> {
  const useState = React.useState<T>(defaultValue);
  const variable = () => useState[0];
  variable.set = useState[1];
  return variable;
}

type PlayerProps = React.PropsWithoutRef<MediaPlayerProps> &
  React.PropsWithoutRef<MediaProviderProps> &
  React.PropsWithoutRef<Omit<DefaultLayoutProps, "icons" | "download">> &
  { textTracks?: React.PropsWithoutRef<TrackProps>[];
    noAnnouncements?: boolean;
    download?: {url: string, filename: string, size: string};
  };

const MediaContext = React.createContext<
  Omit<PlayerProps, "children" | "textTracks"> &{
    userPrefersAnnouncements: UseCustomState<boolean>;
    userPrefersKeyboardAnimations: UseCustomState<boolean>;
    volumeSliderOpen: UseCustomState<boolean>;
    chaptersMenuOpen: UseCustomState<boolean>;
    settingsMenuOpen: UseCustomState<boolean>;
    captionsFontFamily: UseCustomState<string>;
    captionsFontColor: UseCustomState<string>;
    captionsFontSize: UseCustomState<number>;
    captionsFontOpacity: UseCustomState<number>;
    captionsFontEdgeStyle: UseCustomState<string>;
    captionsBackgroundOpacity: UseCustomState<number>;
    captionsBackgroundColor: UseCustomState<string>;
    captionsWindowOpacity: UseCustomState<number>;
    captionsWindowColor: UseCustomState<string>;
  }
>({} as any);

function KeyboardAnimations() {
  const visible = useCustomState<boolean>(false),
  icon = useCustomState<string>(""),
  text = useCustomState<string>(""),
  count = useCustomState<number>(0),
  lastKeyboardAction = useMediaState("lastKeyboardAction");

  React.useEffect(() => {
    count.set((n) => n + 1);
  }, [lastKeyboardAction]);

  const actionDataAttr = React.useMemo(() => {
    const action = lastKeyboardAction?.action;
    return action && visible ? action : null;
  }, [lastKeyboardAction, visible]);

  const className = React.useMemo(() => 
    `vds-kb-action${!visible ? ' hidden ' : ''}`,
  [visible]);

  icon.set(() => {
    switch (lastKeyboardAction?.action) {
      case "togglePaused":
        return !useMediaState("paused") ? "play_arrow" : "pause";
      case "toggleMuted":
        return useMediaState("muted") || useMediaState("volume") == 0
        ? "no_sound"
        : useMediaState("volume") >= 0.5
          ? "volume_up"
          : "volume_down";
      case "toggleFullscreen":
        return useMediaState("fullscreen") ? "fullscreen" : "fullscreen_exit";
      case "togglePictureInPicture":
        return useMediaState("pictureInPicture") ? "pip" : "picture_in_picture_off";
      case "toggleCaptions":
        return useMediaState("hasCaptions")
          ? useMediaState("textTrack")
            ? "subtitles"
            : "subtitles_off"
          : "";
      case "volumeUp":
        return "volume_up";
      case "volumeDown":
        return "volume_down";
      case "seekForward":
        return "fast_forward";
      case "seekBackward":
        return "fast_rewind";
      default:
        return "";
    }
  })

  text.set(() => {
    const audioGain = useMediaState("audioGain") ?? 1;

    switch (lastKeyboardAction?.action) {
      case "toggleMuted":
        return useMediaState("muted") ? "0%" : `${useMediaState("volume") * audioGain * 100}%`;
      case "volumeUp":
      case "volumeDown":
        return `${useMediaState("volume") * audioGain * 100}%`;
      default:
        return "";
    }
  })
  
  React.useEffect(() => {
    visible.set(!!lastKeyboardAction);
    const id = setTimeout(() => visible.set(false), 500);
    return () => {
      visible.set(false);
      clearTimeout(id);
    }
  }, [lastKeyboardAction]);

  return (
    <div
      className={className}
      data-action={actionDataAttr}
    >
      <div className="vds-kb-text-wrapper">
        <div className="vds-kb-text">{text()}</div>
      </div>
      <div className="vds-kb-bezel" key={count()}>
        <div className="vds-kb-icon">
          <MaterialSymbol symbol={icon()} fill size={24} />
        </div>
      </div>
    </div>
  )
}

function TimeSliderComponent() {
  const { disableTimeSlider, noScrubGesture, seekStep, sliderChaptersMinWidth,thumbnails } = React.useContext(MediaContext),
  [instance, setInstance] = React.useState<TimeSliderInstance | null>(null),
  [width, setWidth] = React.useState(0);

  return (
    <div className="align-center flex px-3 -mb-4 pointer-events-auto">
      <TimeSlider.Root
        className="vds-time-slider vds-slider"
        aria-label="Seek"
        disabled={disableTimeSlider}
        noSwipeGesture={noScrubGesture}
        keyStep={seekStep}
      >
        <TimeSlider.Chapters
          className="vds-slider-chapters"
          disabled={width < sliderChaptersMinWidth!}
        >
          {(cues, forwardRef) =>
            cues.map((cue) => (
              <div className="vds-slider-chapter" key={cue.startTime} ref={forwardRef}>
                <TimeSlider.Track className="vds-slider-track" />
                <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
              </div>
            ))
          }
        </TimeSlider.Chapters>
        <TimeSlider.Thumb className="vds-slider-thumb" />
        <TimeSlider.Preview className="vds-slider-preview">
          {thumbnails && (
            <TimeSlider.Thumbnail.Root
              src={thumbnails}
              className="vds-slider-thumbnail vds-thumbnail m-[10px]"
            >
              <TimeSlider.Thumbnail.Img />
            </TimeSlider.Thumbnail.Root>
          )}
          <TimeSlider.ChapterTitle className="vds-slider-chapter-title" />
          <TimeSlider.Value className="vds-slider-value" />
        </TimeSlider.Preview>
      </TimeSlider.Root>
    </div>
  )
}

function PlayButtonComponent() {
  const paused = useMediaState("paused"),
  ended = useMediaState("ended");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="default" asChild className="px-5 h-12 py-0 mr-1">
          <PlayButton>
              {ended ? (
                <MaterialSymbol symbol="replay" fill size={24}/>
              ) : paused ? (
                <MaterialSymbol symbol="play_arrow" fill size={24}/>
              ) : (
                <MaterialSymbol symbol="pause" fill size={24}/>
              )}
          </PlayButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {ended ? "Replay" : paused ? "Play" : "Pause"}
      </TooltipContent>
    </Tooltip>
  )
}

function TimeInfo() {
  const live = useMediaState("live");

  return live ? (
    <Button variant="icon" asChild>
      <LiveButton>
          <span className="vds-live-button-text">LIVE</span>
      </LiveButton>
    </Button>
  ) : (
    <div className="flex items-center gap-1.5">
      <Time type="current" />
      <div>/</div>
      <Time type="duration" />
    </div>
  )
}

function TitleComponent() {
  const hasChapters = useActiveTextTrack("chapters"),
  started = useMediaState("started"),
  title = useMediaState("title"),
  chapterTitle = useChapterTitle();

  return (
    <p className="text-foreground/65 flex items-center">
      {(hasChapters && (started || !title)) ? chapterTitle : title}
    </p>
  )
}

function VolumePopupSliderComponent(
  { dropdownMenuContainerRef, controlBarIconsRef }:
  { dropdownMenuContainerRef: React.RefObject<HTMLDivElement>; controlBarIconsRef: React.RefObject<HTMLDivElement>; }
) {
  const muted = useMediaState("muted"),
  volume = useMediaState("volume"),
  remote = useMediaRemote();

  const { volumeSliderOpen, chaptersMenuOpen, settingsMenuOpen } = React.useContext(MediaContext),
  volumeSliderTriggerRef = React.useRef<HTMLButtonElement>(null),
  volumeSliderContentRef = React.useRef<HTMLDivElement>(null),
  volumeSliderOpenChangeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function attemptVolumeSliderOpenChange() {
    clearTimeout(volumeSliderOpenChangeTimeoutRef.current);
    volumeSliderOpenChangeTimeoutRef.current = setTimeout(() => {
      if (!volumeSliderContentRef.current?.matches(":hover") && !volumeSliderTriggerRef.current?.matches(":hover")) {
        volumeSliderOpen.set(false);
      }
    }, 200);
  }

  React.useEffect(() => {
    if (volumeSliderOpen()) {
      chaptersMenuOpen.set(false);
      settingsMenuOpen.set(false);
    }
  }, [volumeSliderOpen()])

  return !(useMediaState("pointer") === "coarse" && !muted) && (
    <DropdownMenu open={volumeSliderOpen()} modal={false}>
      <DropdownMenuTrigger className="flex h-full items-center" overrideClassName ref={volumeSliderTriggerRef} onMouseOver={() => {volumeSliderOpen.set(true)}} onMouseLeave={attemptVolumeSliderOpenChange}>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonDiv variant="icon" size="icon">
              <MuteButton asChild>
                <MaterialSymbol
                  symbol={muted ||volume == 0 ? "no_sound" : volume < 0.5 ? "volume_down" : "volume_up"}
                  fill size={24}
                />
              </MuteButton>
            </ButtonDiv>
          </TooltipTrigger>
          <TooltipContent>
            {muted ? "Unmute" : "Mute"}
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        sideOffset={0}
        className="h-14 flex px-5 rounded-t-md bg-card/50 items-center backdrop-blur-sm data-[state=open]:animate-in slide-in-from-bottom data-[state=closed]:animate-out slide-out-to-bottom duration-200 ease-out" overrideClassName
        container={dropdownMenuContainerRef.current}
        collisionBoundary={dropdownMenuContainerRef.current}
        onMouseLeave={attemptVolumeSliderOpenChange}
        ref={volumeSliderContentRef}
        style={{width: controlBarIconsRef.current?.offsetWidth}}
      >
        <Slider value={[volume * 100]} onValueChange={(value) => {remote.changeVolume(value[0] / 100);}} min={0} max={100} step={1}/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CaptionButtonComponent() {
  const captionOptions = useCaptionOptions({ off: false }),
  { selectedTrack } = captionOptions,
  captionsEnabled = selectedTrack && isTrackCaptionKind(selectedTrack),
  anyCaptions = captionOptions.length > 1;

  return anyCaptions && (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="icon" size="icon" asChild>
          <CaptionButton>
            <MaterialSymbol
              symbol={captionsEnabled ? "subtitles" : "subtitles_off"}
              fill size={24}
            />
          </CaptionButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
      {anyCaptions ? captionsEnabled ? "Subtitles/CC are on" : "Subtitles/CC are off" : "No subtitles/CC available"}
      </TooltipContent>
    </Tooltip>
  )
}

function RemotePlaybackButtons() {
  return <>
    <Tooltip>
      <TooltipTrigger className="aria-hidden:hidden" asChild>
        <Button variant="icon" size="icon" asChild>
          <AirPlayButton>
            <MaterialSymbol symbol="airplay" fill size={24}/>
          </AirPlayButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        AirPlay
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger className="aria-hidden:hidden" asChild>
        <Button variant="icon" size="icon" asChild>
          <GoogleCastButton>
              <MaterialSymbol symbol="cast" fill size={24}/>
          </GoogleCastButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Google Cast
      </TooltipContent>
    </Tooltip>
  </>
}

function ChapterMenuComponent(
  { dropdownMenuContainerRef, controlBarIconsRef }:
  { dropdownMenuContainerRef: React.RefObject<HTMLDivElement>; controlBarIconsRef: React.RefObject<HTMLDivElement>; }
) {
  const chapterOptions = useChapterOptions(),
  { volumeSliderOpen, chaptersMenuOpen, settingsMenuOpen, thumbnails } = React.useContext(MediaContext);
  const chaptersMenuTriggerRef = React.useRef<HTMLButtonElement>(null),
  chaptersMenuContentRef = React.useRef<HTMLDivElement>(null),
  chaptersMenuOpenChangeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const chapter = useCustomState<string | null>(null);

  function attemptChaptersMenuOpenChange() {
    clearTimeout(chaptersMenuOpenChangeTimeoutRef.current);
    chaptersMenuOpenChangeTimeoutRef.current = setTimeout(() => {
      if (!chaptersMenuContentRef.current?.matches(":hover") && !chaptersMenuTriggerRef.current?.matches(":hover")) {
        chaptersMenuOpen.set(false);
      }
    }, 200);
  }

  React.useEffect(() => {
    if (chaptersMenuOpen()) {
      volumeSliderOpen.set(false);
      settingsMenuOpen.set(false);
    }
  }, [chaptersMenuOpen()])

  return chapterOptions.length > 0 && (
    <DropdownMenu open={chaptersMenuOpen()} modal={false}>
      <DropdownMenuTrigger className="flex h-full items-center" overrideClassName ref={chaptersMenuTriggerRef} onMouseOver={() => {chaptersMenuOpen.set(true)}} onMouseLeave={attemptChaptersMenuOpenChange}>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonDiv variant="icon" size="icon">
              <MaterialSymbol symbol="bookmarks" fill size={24}/>
            </ButtonDiv>
          </TooltipTrigger>
          <TooltipContent>
            Chapters
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        loop
        sideOffset={0}
        className="flex py-2 rounded-t-md bg-card/50 items-center backdrop-blur-sm data-[state=open]:animate-in slide-in-from-bottom data-[state=closed]:animate-out slide-out-to-bottom duration-200 ease-out" overrideClassName
        container={dropdownMenuContainerRef.current}
        collisionBoundary={dropdownMenuContainerRef.current}
        onMouseLeave={attemptChaptersMenuOpenChange}
        ref={chaptersMenuContentRef}
        style={{width: controlBarIconsRef.current?.offsetWidth}}
      >
        <DropdownMenuRadioGroup value={chapter()} onValueChange={chapter.set}>
          {chapterOptions.map(({ cue, label, value, startTimeText, durationText, select, setProgressVar, selected }) => (
            <DropdownMenuRadioItem value={value} onSelect={select} ref={setProgressVar} data-active={selected ? selected : undefined} noIndicator className="px-4! gap-3 h-23 focus:bg-card/50 data-active:bg-card/50 group/chapter" key={value}>
              {thumbnails && (
                <Thumbnail.Root src={thumbnails} className="vds-thumbnail shrink-0 border-0! rounded-md after:absolute after:bottom-0 after:left-0 after:h-1 after:w-[var(--progress)] after:bg-foreground after:rounded-none" time={cue.startTime}>
                  <Thumbnail.Img />
                </Thumbnail.Root>
              )}
              <div className="vds-chapter-radio-content">
                <span className="vds-chapter-radio-label">{label}</span>
                <div className="flex gap-1.5">
                  <span className="vds-chapter-radio-start-time rounded-sm bg-card/50 group-focus:bg-card/65 px-1.5 py-0.5">{startTimeText}</span>
                  <span className="vds-chapter-radio-duration rounded-sm bg-card/50 group-focus:bg-card/65 px-1.5 py-0.5">{durationText}</span>
                </div>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SettingsMenuComponent(
  { dropdownMenuContainerRef, controlBarIconsRef }:
  { dropdownMenuContainerRef: React.RefObject<HTMLDivElement>; controlBarIconsRef: React.RefObject<HTMLDivElement>; }
) {
  const { volumeSliderOpen, chaptersMenuOpen, settingsMenuOpen, userPrefersAnnouncements, userPrefersKeyboardAnimations, noKeyboardAnimations,
    captionsFontFamily, captionsFontColor, captionsFontSize, captionsFontOpacity, captionsFontEdgeStyle, captionsBackgroundOpacity, captionsBackgroundColor, captionsWindowOpacity, captionsWindowColor, src
  } = React.useContext(MediaContext),
  { userPrefersLoopChange, changePlaybackRate, changeAudioGain } = useMediaRemote(),
  captionOptions = useCaptionOptions({off: true}),
  { selectedTrack } = captionOptions,
  captionsEnabled = selectedTrack && isTrackCaptionKind(selectedTrack),
  captionOptionsNoOff = useCaptionOptions(),
  anyCaptions = captionOptionsNoOff.length > 0,
  audioOptions = useAudioOptions(),
  videoQualityOptions = useVideoQualityOptions({auto: true});

  const settingsMenuHistory = useCustomState<{current: string, previous: string[]}>({current: "main", previous: []});

  const settingsMenuHeight = useCustomState<string>("0"),
  settingsMenuTriggerRef = React.useRef<HTMLButtonElement>(null),
  settingsMenuContentRef = React.useRef<HTMLDivElement>(null),
  mainSettingsMenuRef = React.useRef<HTMLDivElement>(null),
  accessibilitySettingsMenuRef = React.useRef<HTMLDivElement>(null),
  playbackSettingsMenuRef = React.useRef<HTMLDivElement>(null),
  audioSettingsMenuRef = React.useRef<HTMLDivElement>(null),
  audioTrackSettingsMenuRef = React.useRef<HTMLDivElement>(null),
  captionsSettingsMenuRef = React.useRef<HTMLDivElement>(null),
  captionsFormatSettingsMenuRef = React.useRef<HTMLDivElement>(null),
  captionsFormatFontSettingsMenuRef = React.useRef<HTMLDivElement>(null),
  captionsFormatEdgeStyleSettingsMenuRef = React.useRef<HTMLDivElement>(null),
  qualitySettingsMenuRef = React.useRef<HTMLDivElement>(null);

  function handleSettingsMenuOpenChange(isOpen: boolean) {
    if (isOpen != settingsMenuOpen()) {
      settingsMenuOpen.set(isOpen);
      if (isOpen == true) {
        settingsMenuHistory.set({
          current: "main",
          previous: [],
        });
        settingsMenuHeight.set(`${mainSettingsMenuRef.current?.offsetHeight}px`);
      }
    }
  }

  const goBack = () => {
    if (settingsMenuHistory().previous.length > 0) {
      const newPrevious = [...settingsMenuHistory().previous];
      const previousMenu = newPrevious.pop() || "main";

      settingsMenuHistory.set({
        current: previousMenu,
        previous: newPrevious,
      });
    }
  }

  const handleMenuItemSelect = (tabId: string | (() => void)) => (e: Event) => {
    e.preventDefault();
    if (typeof tabId === "string") {
      settingsMenuHistory.set((prev => ({
        current: tabId,
        previous: [...prev.previous, prev.current],
      })));
    } else {
      goBack();
    }
  }

  const settingsMenuOpenChangeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function attemptSettingsMenuOpenChange() {
    clearTimeout(settingsMenuOpenChangeTimeoutRef.current);
    settingsMenuOpenChangeTimeoutRef.current = setTimeout(() => {
      if (!settingsMenuTriggerRef.current?.matches(":hover") && !settingsMenuContentRef.current?.matches(":hover")) {
        handleSettingsMenuOpenChange(false);
      }
    }, 200);
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      switch (settingsMenuHistory().current) {
        case "main":
          settingsMenuHeight.set(`${mainSettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "accessibility":
          settingsMenuHeight.set(`${accessibilitySettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "playback":
          settingsMenuHeight.set(`${playbackSettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "audio":
          settingsMenuHeight.set(`${audioSettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "audio-track":
          settingsMenuHeight.set(`${audioTrackSettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "captions":
          settingsMenuHeight.set(`${captionsSettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "captions-format":
          settingsMenuHeight.set(`${captionsFormatSettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "captions-format-font":
          settingsMenuHeight.set(`${captionsFormatFontSettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "captions-format-edge-style":
          settingsMenuHeight.set(`${captionsFormatEdgeStyleSettingsMenuRef.current?.offsetHeight}px`);
          break;
        case "quality":
          settingsMenuHeight.set(`${qualitySettingsMenuRef.current?.offsetHeight}px`);
          break;
      }
      const timer = setTimeout(() => clearTimeout(settingsMenuOpenChangeTimeoutRef.current!), 149);
      return () => clearTimeout(timer);
    }, 50);
    return () => clearTimeout(timer);
  }, [settingsMenuHistory])

  const playbackSpeed = useCustomState<number>(1),
  audioGain = useCustomState<number>(100),
  audioTrack = useCustomState<string | null>(null),
  caption = useCustomState<string | null>(null),
  quality = useCustomState<string | null>(null);

  function captionsFontFamilyLabel(fontFamily: string) {
    switch (fontFamily) {
      case "mono-serif":
        return "Monospaced serif";
      case "pro-serif":
        return "Proportional serif";
      case "mono-sans":
        return "Monospaced sans-serif";
      case "pro-sans":
        return "Proportional sans-serif";
      case "casual":
        return "Casual";
      case "cursive":
        return "Cursive";
      case "small-caps":
        return "Small capitals";
    }
  }

  function captionsFontEdgeStyleLabel(edgeStyle: string) {
    switch (edgeStyle) {
      case "none":
        return "None";
      case "drop-shadow":
        return "Drop shadow";
      case "raised":
        return "Raised";
      case "depressed":
        return "Depressed";
      case "outline":
        return "Outline";
    }
  }

  React.useEffect(() => {
    if (settingsMenuOpen()) {
      volumeSliderOpen.set(false);
      chaptersMenuOpen.set(false);
    }
  }, [settingsMenuOpen()])

  return (
    <DropdownMenu open={settingsMenuOpen()} onOpenChange={(open) => handleSettingsMenuOpenChange(open)} modal={false}>
      <DropdownMenuTrigger className="group flex h-full items-center" overrideClassName ref={settingsMenuTriggerRef} onMouseEnter={() => handleSettingsMenuOpenChange(true)} onMouseLeave={attemptSettingsMenuOpenChange}>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonDiv variant="icon" size="icon">
              <MaterialSymbol symbol="settings" fill size={24} className="group-aria-expanded:rotate-60 transition-transform"/>
            </ButtonDiv>
          </TooltipTrigger>
          <TooltipContent>
            Settings
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        loop
        sideOffset={0}
        className="flex p-2 rounded-t-md bg-card/50 items-center backdrop-blur-sm data-[state=open]:animate-in slide-in-from-bottom data-[state=closed]:animate-out slide-out-to-bottom duration-200 ease-out" overrideClassName
        container={dropdownMenuContainerRef.current}
        collisionBoundary={dropdownMenuContainerRef.current}
        onMouseLeave={attemptSettingsMenuOpenChange}
        ref={settingsMenuContentRef}
        style={{width: controlBarIconsRef.current?.offsetWidth}}
      >
        <Tabs value={settingsMenuHistory().current} className="w-full transition-[height] duration-200 ease-in-out will-change-[height]" style={{height: settingsMenuHeight()}}>
          <TabsContent value="main" ref={mainSettingsMenuRef} className="*:**:has-[role^='menuitem']:focus:bg-accent/50 *:gap-2">
            <DropdownMenuItem onSelect={handleMenuItemSelect("accessibility")}>
              <MaterialSymbol symbol="accessibility_new" fill size={24}/>
              <span>Accessibility</span>
            </DropdownMenuItem> 
            <DropdownMenuItem onSelect={handleMenuItemSelect("playback")}>
              <MaterialSymbol symbol="speed" fill size={24}/>
              <span>Playback</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleMenuItemSelect("audio")}>
              <MaterialSymbol symbol="volume_up" fill size={24}/>
              <span>Audio</span>
            </DropdownMenuItem>
            {anyCaptions && (
              <DropdownMenuItem onSelect={handleMenuItemSelect("captions")}>
                <MaterialSymbol symbol="subtitles" fill size={24}/>
                <span className="flex-grow">Subtitles/CC</span>
                <span className="text-primary/50">{captionOptions.selectedTrack?.label}</span>
              </DropdownMenuItem>
            )}
            {!useVideoQualityOptions({ auto: false }).disabled && (
              <DropdownMenuItem onSelect={handleMenuItemSelect("quality")}>
                <MaterialSymbol symbol="instant_mix" fill size={24}/>
                <span className="flex-grow">Quality</span>
                <span className="text-primary/50">{videoQualityOptions.selectedQuality?.label}{videoQualityOptions.selectedQuality?.hdr && " HDR"}{videoQualityOptions.find((value) => value.selected == true).label == "Auto" && " (Auto)"}</span>
              </DropdownMenuItem>
            )}
          </TabsContent>

          <TabsContent value="accessibility" ref={accessibilitySettingsMenuRef}>
            <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
              <MaterialSymbol symbol="arrow_back" fill size={24}/>
              <span>Accessibility</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2" onSelect={(e) => e.preventDefault()}>
              <Label htmlFor="announcements" className="flex-1">Announcements</Label>
              <Switch id="announcements" checked={userPrefersAnnouncements()} onCheckedChange={userPrefersAnnouncements.set}/>
            </DropdownMenuItem>
            {!(useMediaState("viewType") !== "video" || noKeyboardAnimations) && (
              <DropdownMenuItem className="gap-2" onSelect={(e) => e.preventDefault}>
                <Label htmlFor="keyboardAnimations" className="flex-1">Keyboard animations</Label>
                <Switch id="keyboardAnimations" checked={userPrefersKeyboardAnimations()} onCheckedChange={userPrefersAnnouncements.set}/>
              </DropdownMenuItem>
            )}
          </TabsContent>

          <TabsContent value="playback" ref={playbackSettingsMenuRef}>
            <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
              <MaterialSymbol symbol="arrow_back" fill size={24}/>
              <span>Playback</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2" onSelect={(e) => e.preventDefault}>
              <Label htmlFor="loop" className="flex-1">Loop</Label>
              <Switch id="loop" checked={useMediaState("loop")} onCheckedChange={userPrefersLoopChange}/>
            </DropdownMenuItem>

            <DropdownMenuSliderItem label="Speed" value={[playbackSpeed()]} onValueChange={(value) => {changePlaybackRate(value[0]); playbackSpeed.set(value[0])}} min={.10} max={2} step={0.01} valueFormatter={(value) => `${value}x`}/>
          </TabsContent>

          <TabsContent value="audio" ref={audioSettingsMenuRef}>
            <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
              <MaterialSymbol symbol="arrow_back" fill size={24}/>
              <span>Audio</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {!useAudioOptions().disabled && (
              <DropdownMenuItem onSelect={handleMenuItemSelect("audio-track")} className="gap-2">
                <MaterialSymbol symbol="music_note" fill size={24}/>
                <span>Track</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSliderItem label="Gain" value={[audioGain()]} onValueChange={(value) => {changeAudioGain(value[0] / 100); audioGain.set(value[0])}} min={100} max={300} step={1} valueFormatter={(value) => `${value}%`}/>
          </TabsContent>

          {!useAudioOptions().disabled && (
            <TabsContent value="audio-track" ref={audioTrackSettingsMenuRef}>
              <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
                <MaterialSymbol symbol="arrow_back" fill size={24}/>
                <span>Audio Track</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={audioTrack()} onValueChange={audioTrack.set}>
                {useAudioOptions().map(({ label, value, select }) => (
                  <DropdownMenuRadioItem value={value} onSelect={select}>{label}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </TabsContent>
          )}

          {anyCaptions && <>
            <TabsContent value="captions" ref={captionsSettingsMenuRef}>
              <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
                <MaterialSymbol symbol="arrow_back" fill size={24}/>
                <span>Subtitles/CC</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleMenuItemSelect("captions-format")} className="gap-2">
                <MaterialSymbol symbol="text_format" fill size={24}/>
                <span>Captions style</span>
              </DropdownMenuItem>
              <DropdownMenuRadioGroup value={captionOptions.selectedValue} onValueChange={caption.set}>
                {captionOptions.map(({ label, value, select }) => (
                  <DropdownMenuRadioItem value={value} onSelect={select} className="focus:bg-card/50">{label}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </TabsContent>

            <TabsContent value="captions-format" ref={captionsFormatSettingsMenuRef}>
              <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
                <MaterialSymbol symbol="arrow_back" fill size={24}/>
                <span>Captions style</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={handleMenuItemSelect("captions-format-font")} className="gap-2">
                  <MaterialSymbol symbol="brand_family" fill size={24}/>
                  <span>Font family</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={event => event.preventDefault()}>
                  <Label htmlFor="captions-font-color" className="flex-1">Font color</Label>
                  <Input type="color" id="captions-font-color" className="w-[30%]" value={captionsFontColor()} onChange={(event) => captionsFontColor.set(event.target.value)} />
                </DropdownMenuItem>
                <DropdownMenuSliderItem label="Font size" value={[captionsFontSize()]} onValueChange={(value) => captionsFontSize.set(value[0])} min={.1} max={4} step={.05} valueFormatter={(value) => `${value * 100}%`}/>
                <DropdownMenuSliderItem label="Font opacity" value={[captionsFontOpacity()]} onValueChange={(value) => captionsFontOpacity.set(value[0])} min={.1} max={1} step={.05} valueFormatter={(value) => `${value * 100}%`}/>
                <DropdownMenuItem onSelect={handleMenuItemSelect("captions-format-edge-style")} className="gap-2">
                  <MaterialSymbol symbol="style" fill size={24}/>
                  <span>Edge style</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuSliderItem label="Background opacity" value={[captionsBackgroundOpacity()]} onValueChange={(value) => captionsBackgroundOpacity.set(value[0])} min={0} max={1} step={.05} valueFormatter={(value) => `${value * 100}%`}/>
                <DropdownMenuItem>
                  <Label htmlFor="captions-background-color" className="flex-1">Background color</Label>
                  <Input type="color" id="captions-background-color" className="w-[30%]" value={captionsBackgroundColor()} onChange={(event) => captionsBackgroundColor.set(event.target.value)} />
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuSliderItem label="Window opacity" value={[captionsWindowOpacity()]} onValueChange={(value) => captionsWindowOpacity.set(value[0])} min={0} max={1} step={.05} valueFormatter={(value) => `${value * 100}%`}/>
                <DropdownMenuItem>
                  <Label htmlFor="captions-window-color" className="flex-1">Window color</Label>
                  <Input type="color" id="captions-window-color" className="w-[30%]" value={captionsWindowColor()} onChange={(event) => captionsWindowColor.set(event.target.value)} />
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>Reset</DropdownMenuItem>
            </TabsContent>

            <TabsContent value="captions-format-font" ref={captionsFormatFontSettingsMenuRef}>
              <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
                <MaterialSymbol symbol="arrow_back" fill size={24}/>
                <span>Captions font family</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={captionsFontFamily()} onValueChange={captionsFontFamily.set}>
                {["mono-serif", "pro-serif", "mono-sans", "pro-sans", "casual", "cursive", "small-caps"].map((fontFamily) => (
                  <DropdownMenuRadioItem value={fontFamily} onSelect={() => {captionsFontFamily.set(fontFamily);}} className="focus:bg-card/50">{captionsFontFamilyLabel(fontFamily)}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </TabsContent>

            <TabsContent value="captions-format-edge-style" ref={captionsFormatEdgeStyleSettingsMenuRef}>
              <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
                <MaterialSymbol symbol="arrow_back" fill size={24}/>
                <span>Captions edge style</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={captionsFontEdgeStyle()} onValueChange={captionsFontEdgeStyle.set}>
                {["none", "drop-shadow", "raised", "depressed", "outline"].map((edgeStyle) => (
                  <DropdownMenuRadioItem value={edgeStyle} onSelect={() => {captionsFontEdgeStyle.set(edgeStyle);}} className="focus:bg-card/50">{captionsFontEdgeStyleLabel(edgeStyle)}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </TabsContent>
          </>}

          {!useVideoQualityOptions({ auto: false }).disabled && (
            <TabsContent value="quality" ref={qualitySettingsMenuRef}>
              <DropdownMenuItem className="flex items-center gap-2 font-semibold" onSelect={handleMenuItemSelect(goBack)}>
                <MaterialSymbol symbol="arrow_back" fill size={24}/>
                <span>Quality</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={videoQualityOptions.selectedValue == "auto" ? "auto" as any : videoQualityOptions.selectedQuality?.src as any} onValueChange={quality.set}>
                {videoQualityOptions.map(({ quality, label, value, select }) => (
                  <DropdownMenuRadioItem value={quality?.src ? quality.src : value} onSelect={select} className="focus:bg-card/50 flex gap-2 justify-between">
                    <div className="flex gap-2">
                      {quality?.badge && <MaterialSymbol symbol={quality?.badge} fill size={24}/>}
                      <span>{quality?.label ? quality.label : label}</span>
                    </div>
                    <span className="text-primary/50">
                      {quality?.codec && quality.codec}
                      {quality?.hdr && ", HDR"}
                    </span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </TabsContent>
          )}
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DownloadButtonComponent() {
  const { download } = React.useContext(MediaContext);
  if (download === null) return null;

  const file = getDownloadFile({
    title: useMediaState("title"),
    src: useMediaState("source"),
    download
  })

  return download && (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="icon" size="icon" asChild>
          <a href={file.url as string} download={file.name} title={file.name}>
            <MaterialSymbol symbol="file_download" fill size={24} />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Download ({download?.size})</TooltipContent>
    </Tooltip>
  );
}

function FullscreenButtonComponent() {
  const fullscreen = useMediaState("fullscreen");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="icon" size="icon">
          <FullscreenButton asChild>
              {fullscreen ? (
                <MaterialSymbol symbol="fullscreen_exit" fill size={24}/>
              ) : (
                <MaterialSymbol symbol="fullscreen" fill size={24}/>
              )}
          </FullscreenButton>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {fullscreen ? "Exit fullscreen" : "Fullscreen"}
      </TooltipContent>
    </Tooltip>
  )
}

import { hexToRGB, rgbToCSS } from "../../lib/color-conversion";

function Layout() {
  const { userPrefersAnnouncements, noGestures, volumeSliderOpen, chaptersMenuOpen, settingsMenuOpen,
    captionsFontFamily, captionsFontColor, captionsFontSize, captionsFontOpacity, captionsFontEdgeStyle, captionsBackgroundOpacity, captionsBackgroundColor, captionsWindowOpacity, captionsWindowColor,
   } = React.useContext(MediaContext);

  const dropdownMenuContainerRef = React.useRef<HTMLDivElement>(null),
  controlBarIconsRef = React.useRef<HTMLDivElement>(null),
  layoutDivRef = React.useRef<HTMLDivElement>(null);

  //useMediaContext().qualities.switch = "next";

  React.useEffect(() => {
    if (volumeSliderOpen() || chaptersMenuOpen() || settingsMenuOpen()) {
      controlBarIconsRef.current?.classList.remove("rounded-t-md");
    } else {
      controlBarIconsRef.current?.classList.add("rounded-t-md");
    }
  }, [volumeSliderOpen(), chaptersMenuOpen(), settingsMenuOpen()]);

  function captionsCSSStyle(): CaptionsProps["style"] {
    const fontFamily = (() => {
      switch (captionsFontFamily()) {
        case "mono-serif":
          return `"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace`;
        case "pro-serif":
          return `"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif`;
        case "mono-sans":
          return `"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace`;
        case "pro-sans":
          return null;
        case "casual":
          return `"Comic Sans MS", Impact, Handlee, fantasy`;
        case "cursive":
          return `"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive`;
        case "small-caps":
          return `"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif + font-variant=small-caps`;
      }
    })()

    const fontEdgeStyle = (() => {
      switch (captionsFontEdgeStyle()) {
        case "none":
          return null;
        case "drop-shadow":
          return `rgb(34, 34, 34) 1.86389px 1.86389px 2.79583px, rgb(34, 34, 34) 1.86389px 1.86389px 3.72778px, rgb(34, 34, 34) 1.86389px 1.86389px 4.65972px`;
        case "raised":
          return `rgb(34, 34, 34) 1px 1px, rgb(34, 34, 34) 2px 2px`;
        case "depressed":
          return `rgb(204, 204, 204) 1px 1px, rgb(34, 34, 34) -1px -1px`;
        case "outline":
          return `rgb(34, 34, 34) 0px 0px 3.5625px, rgb(34, 34, 34) 0px 0px 3.5625px, rgb(34, 34, 34) 0px 0px 3.5625px, rgb(34, 34, 34) 0px 0px 3.5625px, rgb(34, 34, 34) 0px 0px 3.5625px`;
      }
    })()

    let captionsFontColorLCH = hexToRGB(captionsFontColor());
    captionsFontColorLCH.a = captionsFontOpacity();

    let captionsBackgroundColorLCH = hexToRGB(captionsBackgroundColor());
    captionsBackgroundColorLCH.a = captionsBackgroundOpacity();

    let captionsWindowColorLCH = hexToRGB(captionsWindowColor());
    captionsWindowColorLCH.a = captionsWindowOpacity();
    

    return {
      "--media-user-font-family": fontFamily,
      //"--media-user-font-size": `calc(var(--text-base) * ${captionsFontSize()})`,
      "--media-user-font-size": captionsFontSize(),
      "--media-user-text-color": rgbToCSS(captionsFontColorLCH),
      "--media-user-text-shadow": `${fontEdgeStyle}`,

      "--media-user-text-bg": rgbToCSS(captionsBackgroundColorLCH),
      "--media-user-text-bg-opacity": captionsBackgroundOpacity(),

      "--media-user-display-bg": rgbToCSS(captionsWindowColorLCH),
      "--media-user-display-bg-opacity": captionsWindowOpacity(),
    }
  }
  
  return (
    <div className="vds-video-layout" data-match>
      {userPrefersAnnouncements && <MediaAnnouncer />}
      {!noGestures && (
        <div className="vds-gestures">
          <Gesture className="vds-gesture" event="pointerup" action="toggle:paused" />
          <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" />
          <Gesture className="vds-gesture" event="dblpointerup" action="toggle:fullscreen" />
          <Gesture className="vds-gesture" event="dblpointerup" action="seek:-10" />
          <Gesture className="vds-gesture" event="dblpointerup" action="seek:10" />
        </div>
      )}
      {/* <KeyboardAnimations /> */}
      <div className="vds-buffering-indicator">
        <MaterialSymbol symbol="progress_activity" fill size={72} className="vds-buffering-spinner"/>
      </div>
      <Captions className="vds-captions" exampleText="Captions will look like this"
        style={captionsCSSStyle()}/>
      <div className="flex absolute flex-col inset-0 w-full h-full bg-linear-to-t from-card/60 from-11% to-card/0 to-30% z-[2] pointer-events-none group-not-data-controls/video-player:opacity-0 transition-opacity" ref={layoutDivRef}>
        <div className="flex-1 pointer-events-none"/>
        <TooltipProvider>
          <TimeSliderComponent />

          <div className="flex h-16 items-center justify-between px-5 py-1.5 pointer-events-auto">
            <div className="flex h-12 gap-4">
              <PlayButtonComponent />
              <TimeInfo />
              <TitleComponent />
            </div>
            <div className="control-bar items-end relative">
              <div className="control-bar-content dropdown-collision-boundary absolute w-full h-[calc(var(--player-height)-calc(var(--spacing,0.25rem)*17.5))] bottom-full mb-1 *:overflow-hidden *:*:overflow-hidden *:*:mb-1 pointer-events-none *:pointer-events-auto" ref={dropdownMenuContainerRef}/>
              <div className="control-bar-icons h-12 gap-4 flex px-4 rounded-b-md rounded-t-md transition-[border_radius] duration-200 ease-in-out bg-card/50 items-center relative backdrop-blur-sm *:data-[state=open]:bg-transparent" ref={controlBarIconsRef}>
                <VolumePopupSliderComponent dropdownMenuContainerRef={dropdownMenuContainerRef} controlBarIconsRef={controlBarIconsRef} />
                <CaptionButtonComponent />
                <RemotePlaybackButtons />
                <ChapterMenuComponent dropdownMenuContainerRef={dropdownMenuContainerRef} controlBarIconsRef={controlBarIconsRef} />
                <SettingsMenuComponent dropdownMenuContainerRef={dropdownMenuContainerRef} controlBarIconsRef={controlBarIconsRef} />
                <DownloadButtonComponent />
                <FullscreenButtonComponent />
              </div>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}

export type VideoPlayerProps = Omit<PlayerProps, "children">
  & {
    description?: string,
    date?: string,
    posters?: string[],
    this: string,
    associatedPost?: string[],
    id: string
  }

import { cssToHSL, hslToHex } from "../../lib/color-conversion"

export function VideoPlayer({ thumbnails, textTracks, ...props }: VideoPlayerProps) {
  const mediaContext = useMediaContext(),
  userPrefersAnnouncements = useCustomState<boolean>(false),
  userPrefersKeyboardAnimations = useCustomState<boolean>(false),

  volumeSliderOpen = useCustomState<boolean>(false),
  chaptersMenuOpen = useCustomState<boolean>(false),
  settingsMenuOpen = useCustomState<boolean>(false),

  captionsFontFamily = useCustomState<string>("pro-sans"),
  captionsFontColor = useCustomState<string>(hslToHex(cssToHSL("hsl(0 0% 98%)"))),
  captionsFontSize = useCustomState<number>(1),
  captionsFontOpacity = useCustomState<number>(1),
  captionsFontEdgeStyle = useCustomState<string>("none"),
  captionsBackgroundOpacity = useCustomState<number>(.75),
  captionsBackgroundColor = useCustomState<string>(hslToHex(cssToHSL("hsl(240 10% 3.9%)"))),
  captionsWindowOpacity = useCustomState<number>(0),
  captionsWindowColor = useCustomState<string>(hslToHex(cssToHSL("hsl(240 10% 3.9%)")));

  return (
    <MediaContext.Provider value={{
      ...mediaContext,
      disableTimeSlider: props.disableTimeSlider,
      hideQualityBitrate: props.hideQualityBitrate,
      download: props.download,
      noAudioGain: props.noAudioGain,
      audioGains: props.audioGains,
      noGestures: props.noGestures,
      noScrubGesture: props.noScrubGesture,
      noAnnouncements: props.noAnnouncements, userPrefersAnnouncements,
      noKeyboardAnimations: props.noKeyboardAnimations, userPrefersKeyboardAnimations,
      noModal: props.noModal,
      playbackRates: props.playbackRates,
      seekStep: props.seekStep,
      sliderChaptersMinWidth: props.sliderChaptersMinWidth,
      thumbnails,

      volumeSliderOpen,
      chaptersMenuOpen,
      settingsMenuOpen,

      captionsFontFamily,
      captionsFontColor,
      captionsFontSize,
      captionsFontOpacity,
      captionsFontEdgeStyle,
      captionsBackgroundOpacity,
      captionsBackgroundColor,
      captionsWindowOpacity,
      captionsWindowColor,

      src: props.src,
    }}>
      <MediaPlayer {...props} className="video-player not-prose group/video-player">
        <MediaProvider>
          {props.poster && <Poster className="vds-poster"/>}
          {textTracks?.map(track => (
            <Track {...track} key={track.src} />
          ))}
        </MediaProvider>
        <Layout/>
      </MediaPlayer>
    </MediaContext.Provider>
  )
}