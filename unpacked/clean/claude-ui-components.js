// Claude Code Interactive UI Components - Extracted and Translated

// ===================================
// MAIN INTERACTIVE APP COMPONENT (_A1)
// ===================================
// This is the root component that renders the Claude interface
function InteractiveApp({
    commands,
    debug,
    initialPrompt,
    initialTools,
    initialMessages,
    initialTodos,
    initialCheckpoints,
    mcpClients,
    dynamicMcpConfig,
    autoConnectIdeFlag,
    strictMcpConfig = false,
    appendSystemPrompt
}) {
    // App state hooks - global state management
    const [appState, setAppState] = useAppState();
    const {
        todoFeatureEnabled,
        toolPermissionContext,
        verbose,
        mainLoopModel,
        maxRateLimitFallbackActive,
        mcp,
        plugins,
        rateLimitResetsAt
    } = appState;
    
    // Key state variables
    const [dynamicMcpState, setDynamicMcpConfig] = useState(dynamicMcpConfig);
    const [screen, setScreen] = useState("prompt");
    const [screenToggleId, setScreenToggleId] = useState(1);
    const [showAllInTranscript, setShowAllInTranscript] = useState(false);
    
    // Message and conversation state
    const [messages, setMessages] = useState(initialMessages ?? []);
    const [messageHistory, setMessageHistory] = useState([]);
    const [abortController, setAbortController] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userInputOnProcessing, setUserInputOnProcessing] = useState(undefined);
    const [toolJSX, setToolJSX] = useState(null);
    const [streamingToolUses, setStreamingToolUses] = useState([]);
    const [toolUseConfirmQueue, setToolUseConfirmQueue] = useState([]);
    const [currentResponseLength, setCurrentResponseLength] = useState(0);
    const [overrideSpinnerMessage, setOverrideSpinnerMessage] = useState(null);
    const [isMessageSelectorVisible, setIsMessageSelectorVisible] = useState(false);
    const [inProgressToolUseIDs, setInProgressToolUseIDs] = useState(new Set());
    const [conversationId, setConversationId] = useState(generateUUID());
    
    // Clear function for resetting state
    const clearCurrentExecution = useCallback(() => {
        setIsLoading(false);
        setUserInputOnProcessing(undefined);
        setCurrentResponseLength(0);
        setStreamingToolUses([]);
        setOverrideSpinnerMessage(null);
    }, []);
    
    // Main query handler - processes user input and sends to API
    const handleQuery = async (messages, abortController, shouldQuery, allowedTools, model, maxThinkingTokens) => {
        if (isQueryInProgress.current) {
            // Prevent concurrent queries
            const errorMessage = {
                type: "system",
                content: "Previous query still processing. Please try again.",
                timestamp: new Date().toISOString(),
                uuid: generateUUID(),
                level: "warning"
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsLoading(false);
            return;
        }
        
        isQueryInProgress.current = true;
        
        try {
            setMessages(prev => [...prev, ...messages]);
            setCurrentResponseLength(0);
            setStreamingToolUses([]);
            
            // Add user input to history
            const userMessage = messages.filter(m => m.type === "user" || m.type === "assistant").pop();
            if (userMessage?.type === "user" && typeof userMessage.message.content === "string") {
                addToInputHistory(userMessage.message.content);
            }
            
            if (!shouldQuery) {
                clearCurrentExecution();
                setAbortController(null);
                return;
            }
            
            // Build system prompts and context
            const [systemPrompts, userContext, systemContext] = await Promise.all([
                buildSystemPrompts(allTools, mainLoopModel, workingDirectories, mcpClients, toolPermissionContext),
                getUserContext(),
                getSystemContext()
            ]);
            
            const fullSystemPrompts = [...systemPrompts, ...(appendSystemPrompt ? [appendSystemPrompt] : [])];
            
            // Create tool use context
            const toolUseContext = {
                abortController,
                options: {
                    commands: allCommands,
                    tools: allTools,
                    debug,
                    verbose,
                    mainLoopModel: model,
                    maxThinkingTokens: calculateMaxThinkingTokens(messages, maxThinkingTokens),
                    mcpClients: mergedMcpClients,
                    mcpResources: mcp.resources,
                    ideInstallationStatus,
                    isNonInteractiveSession: false,
                    dynamicMcpConfig: dynamicMcpState,
                    theme: currentTheme
                },
                getToolPermissionContext: () => toolPermissionContext,
                getQueuedCommands: () => queuedCommandsRef.current,
                removeQueuedCommands: (commandsToRemove) => {
                    setQueuedCommands(prev => prev.filter(cmd => !commandsToRemove.includes(cmd)));
                },
                messages: [...messages, ...messages],
                setMessages,
                setMessageHistory,
                onChangeAPIKey: reverifyApiKey,
                readFileState: readFileStateRef.current,
                setToolJSX,
                addNotification,
                setToolPermissionContext: updateToolPermissionContext,
                onChangeDynamicMcpConfig: setDynamicMcpConfig,
                onInstallIDEExtension: setIdeToInstallExtension,
                nestedMemoryAttachmentTriggers: new Set(),
                setResponseLength: setCurrentResponseLength,
                setStreamMode: setStreamMode,
                setSpinnerMessage: setOverrideSpinnerMessage,
                setInProgressToolUseIDs,
                agentId: getAgentId(),
                resume: resumeFromCheckpoint
            };
            
            // Execute main query loop
            const promptCategory = getPromptCategory();
            for await (const chunk of queryMainLoop({
                messages: [...messages, ...messages],
                systemPrompt: fullSystemPrompts,
                userContext,
                systemContext,
                canUseTool: canUseToolCallback,
                toolUseContext,
                promptCategory
            })) {
                processStreamingChunk(chunk, 
                    (msg) => setMessages(prev => [...prev, msg]),
                    (text) => setCurrentResponseLength(prev => prev + text.length),
                    setStreamMode,
                    setStreamingToolUses
                );
            }
        } finally {
            isQueryInProgress.current = false;
        }
        
        clearCurrentExecution();
    };
    
    // Component render based on screen mode
    if (screen === "transcript") {
        return (
            <>
                <MessageList
                    messages={messages}
                    normalizedMessageHistory={normalizedMessageHistory}
                    tools={allTools}
                    verbose={true}
                    toolJSX={null}
                    toolUseConfirmQueue={[]}
                    inProgressToolUseIDs={inProgressToolUseIDs}
                    isMessageSelectorVisible={false}
                    conversationId={conversationId}
                    screen={screen}
                    screenToggleId={screenToggleId}
                    streamingToolUses={streamingToolUses}
                    showAllInTranscript={showAllInTranscript}
                />
                <Box 
                    alignItems="center"
                    alignSelf="center"
                    borderTopColor="secondaryBorder"
                    borderBottom={false}
                    borderLeft={false}
                    borderRight={false}
                    borderStyle="single"
                    marginTop={1}
                    paddingLeft={2}
                    width="100%"
                >
                    <Text dimColor={true}>
                        Showing detailed transcript · Ctrl+R to toggle
                    </Text>
                </Box>
            </>
        );
    }
    
    // Main interface render
    return (
        <AppErrorBoundary 
            key={resetKey}
            dynamicMcpConfig={dynamicMcpState}
            isStrictMcpConfig={strictMcpConfig}
        >
            {/* Message display */}
            <MessageList
                messages={messages}
                normalizedMessageHistory={normalizedMessageHistory}
                tools={allTools}
                verbose={verbose}
                toolJSX={toolJSX}
                toolUseConfirmQueue={toolUseConfirmQueue}
                inProgressToolUseIDs={inProgressToolUseIDs}
                isMessageSelectorVisible={isMessageSelectorVisible}
                conversationId={conversationId}
                screen={screen}
                screenToggleId={screenToggleId}
                streamingToolUses={streamingToolUses}
                showAllInTranscript={showAllInTranscript}
            />
            
            {/* User input processing message */}
            {userInputOnProcessing && (
                <Box paddingX={2} paddingTop={1}>
                    <Text dimColor={true}>{userInputOnProcessing}</Text>
                </Box>
            )}
            
            {/* Main content area */}
            <Box flexDirection="column" width="100%">
                {/* Tool JSX display */}
                {toolJSX ? toolJSX.jsx : null}
                
                {/* Loading spinner */}
                {showLoadingSpinner && (
                    <LoadingSpinner
                        mode={streamMode}
                        spinnerVerbs={spinnerVerbs}
                        spinnerTip={appState.spinnerTip}
                        currentResponseLength={currentResponseLength}
                        overrideMessage={overrideSpinnerMessage}
                        verbose={verbose}
                    />
                )}
                
                {/* Tool use confirmation dialog */}
                {!toolJSX && toolUseConfirmQueue[0] !== undefined && !isMessageSelectorVisible && (
                    <ToolUseConfirm
                        onDone={() => setToolUseConfirmQueue(([first, ...rest]) => rest)}
                        onReject={handleQueuedCommandsSubmit}
                        setToolPermissionContext={updateToolPermissionContext}
                        toolUseConfirm={toolUseConfirmQueue[0]}
                        toolUseContext={buildToolUseContext(messages, messages, abortController ?? createAbortController(), [], undefined, mainLoopModel)}
                        verbose={verbose}
                    />
                )}
                
                {/* Cost threshold warning */}
                {!toolJSX && toolUseConfirmQueue.length === 0 && !isMessageSelectorVisible && shouldShowCostThreshold && (
                    <CostThresholdWarning
                        onDone={() => {
                            setShowCostThreshold(false);
                            setHasAcknowledgedCostThreshold(true);
                            const settings = getSettings();
                            updateSettings({
                                ...settings,
                                hasAcknowledgedCostThreshold: true
                            });
                            trackEvent("tengu_cost_threshold_acknowledged", {});
                        }}
                    />
                )}
                
                {/* IDE onboarding dialog */}
                {!toolJSX && toolUseConfirmQueue.length === 0 && !isMessageSelectorVisible && !shouldShowCostThreshold && !exitDialog && !showingExitConfirmation && shouldShowIdeOnboarding && (
                    <IdeOnboarding
                        onDone={() => setShowIdeOnboarding(false)}
                        installationStatus={ideInstallationStatus}
                    />
                )}
                
                {/* Exit dialog */}
                {exitDialog}
                
                {/* Input interface */}
                {toolUseConfirmQueue.length === 0 && !toolJSX?.shouldHidePromptInput && !isMessageSelectorVisible && !shouldShowCostThreshold && !exitDialog && !shouldShowIdeOnboarding && !showingExitConfirmation && (
                    <>
                        <InputSuggestions
                            state={inputSuggestionsState.state}
                            handleSelect={inputSuggestionsState.handleSelect}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        
                        <InputInterface
                            debug={debug}
                            ideSelection={ideSelection}
                            getToolUseContext={buildToolUseContext}
                            toolPermissionContext={toolPermissionContext}
                            setToolPermissionContext={updateToolPermissionContext}
                            apiKeyStatus={apiKeyStatus}
                            commands={allCommands}
                            isLoading={isLoading}
                            onExit={async () => {
                                setShowingExitConfirmation(true);
                                const dialog = await createExitDialog();
                                setExitDialog(dialog);
                            }}
                            onQuery={handleQuery}
                            verbose={verbose}
                            messages={messages}
                            setToolJSX={setToolJSX}
                            onAutoUpdaterResult={setAutoUpdaterResult}
                            autoUpdaterResult={autoUpdaterResult}
                            input={inputValue}
                            onInputChange={setInputValue}
                            mode={inputMode}
                            onModeChange={setInputMode}
                            queuedCommands={queuedCommands}
                            setQueuedCommands={setQueuedCommands}
                            submitCount={submitCount}
                            onSubmitCountChange={(count) => {
                                setIdeSelection(undefined);
                                setSubmitCount(count);
                            }}
                            setIsLoading={setIsLoading}
                            setUserInputOnProcessing={setUserInputOnProcessing}
                            setAbortController={setAbortController}
                            onShowMessageSelector={() => setIsMessageSelectorVisible(prev => !prev)}
                            notification={notification}
                            addNotification={addNotification}
                            mcpClients={mergedMcpClients}
                            pastedContents={pastedContents}
                            setPastedContents={setPastedContents}
                            vimMode={vimMode}
                            setVimMode={setVimMode}
                            ideInstallationStatus={ideInstallationStatus}
                            showBashesDialog={showBashesDialog}
                            setShowBashesDialog={setShowBashesDialog}
                        />
                    </>
                )}
            </Box>
            
            {/* Message selector (for checkpoint restoration) */}
            {isMessageSelectorVisible && (
                <MessageSelector
                    erroredToolUseIDs={erroredToolUseIDs}
                    resolvedToolUseIDs={resolvedToolUseIDs}
                    messages={messages}
                    onPreRestore={abortCurrentQuery}
                    onRestoreWorkspace={async (message) => {
                        const messageIndex = messages.indexOf(message);
                        const checkpoint = findCheckpoint(messages, messageIndex);
                        if (!checkpoint) {
                            throw new Error("Checkpoint not found");
                        }
                        try {
                            return await restoreWorkspace(checkpoint, appState.checkpointing, (status) => {
                                setAppState(prev => ({
                                    ...prev,
                                    checkpointing: status
                                }));
                            });
                        } catch (error) {
                            logError(error);
                            throw error;
                        }
                    }}
                    onRestoreMessage={async (message) => {
                        const messageIndex = messages.indexOf(message);
                        const restoredMessages = messages.slice(0, messageIndex);
                        
                        setImmediate(async () => {
                            await clearSession();
                            setMessages([...restoredMessages]);
                            setConversationId(generateUUID());
                            
                            if (typeof message.message.content === "string") {
                                const content = message.message.content;
                                const bashInput = extractBashInput(content);
                                const commandName = extractCommandName(content);
                                
                                if (bashInput) {
                                    setInputValue(bashInput);
                                    setInputMode("bash");
                                } else if (commandName) {
                                    const commandArgs = extractCommandArgs(content) || "";
                                    setInputValue(`${commandName} ${commandArgs}`);
                                    setInputMode("prompt");
                                } else {
                                    setInputValue(content);
                                    setInputMode("prompt");
                                }
                            } else if (Array.isArray(message.message.content) && message.message.content.length >= 2) {
                                // Handle multi-part content (text + images)
                                const textContent = message.message.content.find(part => part.type === "text");
                                if (textContent && textContent.type === "text") {
                                    setInputValue(textContent.text);
                                    setInputMode("prompt");
                                }
                                
                                const imageContent = message.message.content.filter(part => part.type === "image");
                                if (imageContent.length > 0) {
                                    const pastedImages = {};
                                    imageContent.forEach((image, index) => {
                                        if (image.source.type === "base64") {
                                            pastedImages[index + 1] = {
                                                id: index + 1,
                                                type: "image",
                                                content: image.source.data,
                                                mediaType: image.source.media_type
                                            };
                                        }
                                    });
                                    setPastedContents(pastedImages);
                                }
                            }
                        });
                    }}
                    onClose={() => setIsMessageSelectorVisible(false)}
                    tools={allTools}
                />
            )}
        </AppErrorBoundary>
    );
}

// ===================================
// INPUT INTERFACE COMPONENT (GcB -> SR8)
// ===================================
// This handles the main input interface with text input, commands, etc.
function InputInterface({
    debug,
    ideSelection,
    toolPermissionContext,
    setToolPermissionContext,
    apiKeyStatus,
    commands,
    isLoading,
    onQuery,
    verbose,
    messages,
    setToolJSX,
    onAutoUpdaterResult,
    autoUpdaterResult,
    input,
    onInputChange,
    mode,
    onModeChange,
    queuedCommands,
    setQueuedCommands,
    submitCount,
    onSubmitCountChange,
    setIsLoading,
    setUserInputOnProcessing,
    setAbortController,
    onShowMessageSelector,
    notification,
    addNotification,
    mcpClients,
    pastedContents,
    setPastedContents,
    vimMode,
    setVimMode,
    ideInstallationStatus,
    showBashesDialog,
    setShowBashesDialog,
    onExit,
    getToolUseContext
}) {
    const currentModel = getCurrentModel();
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [exitMessage, setExitMessage] = useState({ show: false });
    const [placeholderText, setPlaceholderText] = useState("");
    const [cursorOffset, setCursorOffset] = useState(input.length);
    const [appState, setAppState] = useAppState();
    const [hasProcessedLargeInput, setHasProcessedLargeInput] = useState(false);
    
    // Process large input for performance
    useEffect(() => {
        if (!hasProcessedLargeInput && input.length > 10000) {
            const processed = processLargeInput(input, pastedContents);
            if (processed) {
                const { newInput, newPastedContents } = processed;
                onInputChange(newInput);
                setPastedContents(newPastedContents);
                setCursorOffset(newInput.length);
            }
            setHasProcessedLargeInput(true);
        }
    }, [input, hasProcessedLargeInput, pastedContents, onInputChange, setPastedContents]);
    
    // Reset processing flag when input is cleared
    useEffect(() => {
        if (input === "") {
            setHasProcessedLargeInput(false);
        }
    }, [input]);
    
    // Calculate next paste ID
    const nextPasteId = useMemo(() => {
        const ids = Object.keys(pastedContents).map(Number);
        if (ids.length === 0) return 1;
        return Math.max(...ids) + 1;
    }, [pastedContents]);
    
    // Undo functionality for input
    const {
        pushToBuffer,
        undo,
        canUndo,
        clearBuffer
    } = useUndoBuffer({
        maxBufferSize: 50,
        debounceMs: 1000
    });
    
    const isFirstTimeUser = !input && submitCount === 0;
    
    // Set placeholder text for first-time users
    useEffect(() => {
        if (submitCount > 0 || placeholderText) return;
        generatePlaceholderText(false).then((text) => {
            setPlaceholderText(`Try "${formatPlaceholder(text)}"`);
        });
    }, [mode, placeholderText, submitCount]);
    
    // Handle input changes
    const handleInputChange = useCallback((newInput) => {
        if (newInput === "?") {
            trackEvent("tengu_help_toggled", {});
            setIsHelpOpen(prev => !prev);
            return;
        }
        
        setIsHelpOpen(false);
        
        const isCharacterAdded = newInput.length === input.length + 1;
        const isAtStart = cursorOffset === 0;
        
        // Handle mode switching shortcuts
        if (isCharacterAdded && isAtStart && newInput.startsWith("!")) {
            onModeChange("bash");
            return;
        }
        
        if (isCharacterAdded && isAtStart && newInput.startsWith("#")) {
            onModeChange("memory");
            return;
        }
        
        // Normalize tab characters
        const normalizedInput = newInput.replaceAll("\t", "    ");
        
        if (input !== normalizedInput) {
            pushToBuffer(input, cursorOffset, pastedContents);
        }
        
        onInputChange(normalizedInput);
    }, [onInputChange, onModeChange, input, cursorOffset, pushToBuffer, pastedContents]);
    
    // History navigation
    const {
        resetHistory,
        onHistoryUp,
        onHistoryDown
    } = useInputHistory((historyInput, historyMode, historyPastedContents) => {
        handleInputChange(historyInput);
        onModeChange(historyMode);
        setPastedContents(historyPastedContents);
    }, input, pastedContents, setCursorOffset);
    
    // Shell management
    const { shells } = useShells();
    const runningShellCount = shells.filter(shell => shell.status === "running").length;
    
    const MAX_TASK_HINTS = 3;
    
    // History navigation handlers
    const handleHistoryUp = () => {
        if (suggestions.length <= 1) {
            if (queuedCommands.length > 0) {
                handleQueuedCommandsSubmit();
                return;
            }
            if (shellsSelected) {
                setShellsSelected(false);
            } else {
                onHistoryUp();
            }
        }
    };
    
    const handleHistoryDown = () => {
        if (suggestions.length <= 1) {
            const hasHistory = onHistoryDown();
            if (hasHistory && runningShellCount > 0) {
                setShellsSelected(true);
                const settings = getSettings();
                if (!settings.hasSeenTasksHint) {
                    updateSettings({
                        ...settings,
                        hasSeenTasksHint: true
                    });
                }
            } else {
                setShellsSelected(false);
            }
            return hasHistory;
        }
        return false;
    };
    
    // Command suggestions state
    const [suggestionsState, setSuggestionsState] = useState({
        suggestions: [],
        selectedSuggestion: -1,
        commandArgumentHint: undefined
    });
    
    // Main submit handler
    const handleSubmit = useCallback(async (inputText, skipSuggestions = false, memoryType) => {
        if (inputText.trim() === "") return;
        
        // Handle suggestions
        const isDirectoryOnly = suggestionsState.suggestions.length > 0 && 
            suggestionsState.suggestions.every(suggestion => suggestion.description === "directory");
        
        if (suggestionsState.suggestions.length > 0 && !skipSuggestions && !isDirectoryOnly) {
            return;
        }
        
        // Handle exit commands
        if (["exit", "quit", ":q", ":q!", ":wq", ":wq!"].includes(inputText.trim())) {
            if (commands.find(cmd => cmd.name === "exit")) {
                handleSubmit("/exit", true);
            } else {
                process.exit(0);
            }
            return;
        }
        
        // Process pasted content
        let processedInput = inputText;
        const pasteReferences = findPasteReferences(inputText);
        let pastedTextCount = 0;
        
        for (const ref of pasteReferences) {
            const pastedContent = pastedContents[ref.id];
            if (pastedContent && pastedContent.type === "text") {
                processedInput = processedInput.replace(ref.match, pastedContent.content);
                pastedTextCount++;
            }
        }
        
        trackEvent("tengu_paste_text", { pastedTextCount });
        
        // Handle loading state - queue command if already loading
        if (isLoading) {
            if (mode !== "prompt") return;
            setQueuedCommands(prev => [...prev, {
                value: processedInput,
                mode: "prompt"
            }]);
            onInputChange("");
            setCursorOffset(0);
            setPastedContents({});
            resetHistory();
            clearBuffer();
            return;
        }
        
        // Handle memory mode
        if (mode === "memory") {
            onModeChange("memorySelect");
            return;
        }
        
        // Clear input and prepare for submission
        onInputChange("");
        setCursorOffset(0);
        onModeChange("prompt");
        setPastedContents({});
        onSubmitCountChange(prev => prev + 1);
        clearBuffer();
        
        // Create checkpoint
        const autocheckpoint = await createAutocheckpoint(processedInput, mode, appState.checkpointing, (status) => {
            setAppState(prev => ({
                ...prev,
                checkpointing: status
            }));
        });
        
        const abortController = createAbortController();
        setAbortController(abortController);
        
        // Process the input through command system
        const {
            messages: newMessages,
            shouldQuery,
            allowedTools,
            skipHistory,
            maxThinkingTokens,
            model
        } = await processUserInput({
            input: processedInput,
            mode: mode,
            setIsLoading,
            setToolJSX,
            context: getToolUseContext(messages, [], abortController, [], undefined, currentModel),
            pastedContents,
            ideSelection,
            memoryType,
            autocheckpoint,
            messages,
            setUserInputOnProcessing
        });
        
        setToolJSX(null);
        
        if (newMessages.length) {
            onQuery(newMessages, abortController, shouldQuery, allowedTools ?? [], model ?? currentModel, maxThinkingTokens);
        } else {
            if (!skipHistory) {
                addToInputHistory({
                    display: inputText,
                    pastedContents
                });
            }
            resetHistory();
            setAbortController(null);
            return;
        }
        
        // Add to history for user messages
        for (const message of newMessages) {
            if (message.type === "user") {
                const displayInput = mode === "bash" ? `!${inputText}` : 
                    mode === "memorySelect" ? `#${inputText}` : inputText;
                addToInputHistory({
                    display: displayInput,
                    pastedContents
                });
                resetHistory();
            }
        }
    }, [
        suggestionsState.suggestions, appState.checkpointing, isLoading, mode, onInputChange, 
        onModeChange, setPastedContents, onSubmitCountChange, clearBuffer, setAbortController,
        setToolJSX, getToolUseContext, messages, currentModel, pastedContents, ideSelection, 
        commands, setQueuedCommands, setUserInputOnProcessing, setAppState, resetHistory, onQuery
    ]);
    
    // Get command suggestions
    const {
        suggestions,
        selectedSuggestion,
        commandArgumentHint
    } = useCommandSuggestions({
        commands,
        onInputChange,
        onSubmit: handleSubmit,
        setCursorOffset,
        input,
        cursorOffset,
        mode,
        setSuggestionsState,
        suggestionsState
    });
    
    // Image paste handler
    function handleImagePaste(base64Data, mediaType) {
        trackEvent("tengu_paste_image", {});
        onModeChange("prompt");
        
        const imageContent = {
            id: nextPasteId,
            type: "image",
            content: base64Data,
            mediaType: mediaType || "image/png"
        };
        
        setPastedContents(prev => ({
            ...prev,
            [nextPasteId]: imageContent
        }));
        
        insertAtCursor(createImageReference(imageContent.id));
    }
    
    // Text paste handler
    function handleTextPaste(text) {
        const cleanText = normalizeText(text).replace(/\r/g, '\n').replaceAll("\t", "    ");
        const lineCount = countLines(cleanText);
        const maxLines = Math.min(terminalRows - 10, 2);
        
        if (cleanText.length > MAX_PASTE_LENGTH || lineCount > maxLines) {
            const textContent = {
                id: nextPasteId,
                type: "text",
                content: cleanText
            };
            
            setPastedContents(prev => ({
                ...prev,
                [nextPasteId]: textContent
            }));
            
            insertAtCursor(createTextReference(textContent.id, lineCount));
        } else {
            insertAtCursor(cleanText);
        }
    }
    
    // Helper to insert text at cursor position
    function insertAtCursor(text) {
        pushToBuffer(input, cursorOffset, pastedContents);
        const newInput = input.slice(0, cursorOffset) + text + input.slice(cursorOffset);
        onInputChange(newInput);
        setCursorOffset(cursorOffset + text.length);
    }
    
    // Exit handler shortcut
    const exitShortcut = useDoublePress(() => {}, () => onShowMessageSelector());
    
    // Handle queued commands submission
    const handleQueuedCommandsSubmit = useCallback(() => {
        if (queuedCommands.length === 0) return;
        
        const combinedInput = [...queuedCommands.map(cmd => cmd.value), input]
            .filter(Boolean)
            .join('\n');
        
        onInputChange(combinedInput);
        onModeChange("prompt");
        setQueuedCommands(() => []);
        setCursorOffset(queuedCommands.map(cmd => cmd.value).join('\n').length + 1 + cursorOffset);
    }, [queuedCommands, onInputChange, onModeChange, setQueuedCommands, input, cursorOffset]);
    
    // Auto-process queued commands when not loading
    useEffect(() => {
        if (!isLoading && queuedCommands[0]) {
            const queuedInput = queuedCommands.map(cmd => cmd.value).join('\n');
            setQueuedCommands(prev => prev.filter(cmd => !queuedCommands.includes(cmd)));
            handleSubmit(queuedInput, false);
        }
    }, [isLoading, queuedCommands, handleSubmit, setQueuedCommands]);
    
    // MCP file mention integration
    useMcpFileMention(mcpClients, function(mention) {
        trackEvent("tengu_ext_at_mentioned", {});
        let mentionText;
        const relativePath = path.relative(process.cwd(), mention.filePath);
        
        if (mention.lineStart && mention.lineEnd) {
            mentionText = mention.lineStart === mention.lineEnd ? 
                `@${relativePath}#L${mention.lineStart} ` : 
                `@${relativePath}#L${mention.lineStart}-${mention.lineEnd} `;
        } else {
            mentionText = `@${relativePath} `;
        }
        
        const prevChar = input[cursorOffset - 1] ?? " ";
        if (!/\s/.test(prevChar)) {
            mentionText = ` ${mentionText}`;
        }
        
        insertAtCursor(mentionText);
    });
    
    // Keyboard shortcuts
    useInput((inputChar, key) => {
        // Undo shortcut (Ctrl+_)
        if (key.ctrl && inputChar === "_") {
            if (canUndo) {
                const undoState = undo();
                if (undoState) {
                    onInputChange(undoState.text);
                    setCursorOffset(undoState.cursorOffset);
                    setPastedContents(undoState.pastedContents);
                }
            }
            return;
        }
        
        // Show bash tasks (Ctrl+Enter when shells selected)
        if (key.ctrl && inputChar.toLowerCase(), key.return && shellsSelected) {
            setShowBashesDialog(true);
            setShellsSelected(false);
            return;
        }
        
        // Mode reset shortcuts
        if (cursorOffset === 0 && (key.escape || key.backspace || key.delete)) {
            onModeChange("prompt");
            setIsHelpOpen(false);
        }
        
        if (isHelpOpen && input === "" && (key.backspace || key.delete)) {
            setIsHelpOpen(false);
        }
        
        // Permission mode cycling
        if (PermissionModeShortcut.check(inputChar, key)) {
            const nextMode = cyclePermissionMode(toolPermissionContext);
            trackEvent("tengu_mode_cycle", { to: nextMode });
            setToolPermissionContext({
                ...toolPermissionContext,
                mode: nextMode
            });
            if (isHelpOpen) setIsHelpOpen(false);
            return;
        }
        
        // Escape key handling
        if (key.escape) {
            if (shellsSelected) {
                setShellsSelected(false);
                return;
            }
            if (queuedCommands.length > 0) {
                handleQueuedCommandsSubmit();
                return;
            }
            if (messages.length > 0 && !input && !isLoading) {
                exitShortcut();
            }
        }
        
        // Close help on enter
        if (key.return && isHelpOpen) {
            setIsHelpOpen(false);
        }
    });
    
    // Terminal dimensions
    const { columns: terminalColumns, rows: terminalRows } = useStdoutDimensions();
    const maxInputWidth = terminalColumns - 6;
    
    // Current token usage
    const tokenUsage = useMemo(() => calculateTokenUsage(messages), [messages]);
    
    // Check if input will wrap
    const isInputWrapped = useMemo(() => {
        const lines = input.split('\n');
        for (const line of lines) {
            if (line.length > maxInputWidth) return true;
        }
        return lines.length > 1;
    }, [input, maxInputWidth]);
    
    // Show bash dialog if requested
    if (showBashesDialog) {
        return (
            <BashesDialog onDone={() => setShowBashesDialog(false)} />
        );
    }
    
    return (
        <Box flexDirection="column">
            {/* Queued commands display */}
            {queuedCommands.length > 0 && (
                <Box flexDirection="column" marginTop={1}>
                    <Box paddingLeft={2} flexDirection="column" width={terminalColumns - 4}>
                        <Text color="secondaryText" wrap="wrap">
                            {queuedCommands.map(cmd => cmd.value).join('\n')}
                        </Text>
                    </Box>
                </Box>
            )}
            
            {/* Main input container */}
            <Box
                alignItems="flex-start"
                justifyContent="flex-start"
                borderColor={
                    mode === "bash" ? "bashBorder" : 
                    mode === "memory" || mode === "memorySelect" ? "remember" : 
                    "secondaryBorder"
                }
                borderDimColor={mode !== "memory"}
                borderStyle="round"
                marginTop={queuedCommands.length > 0 ? 0 : 1}
                width="100%"
            >
                {/* Input prompt indicator */}
                <Box
                    alignItems="flex-start"
                    alignSelf="flex-start"
                    flexWrap="nowrap"
                    justifyContent="flex-start"
                    width={3}
                >
                    {mode === "bash" ? (
                        <Text color="bashBorder" dimColor={isLoading}> ! </Text>
                    ) : mode === "memory" || mode === "memorySelect" ? (
                        <Text color="remember" dimColor={isLoading}> # </Text>
                    ) : (
                        <Text color={isLoading ? "secondaryText" : undefined}> > </Text>
                    )}
                </Box>
                
                {/* Text input component */}
                <Box paddingRight={1}>
                    {(() => {
                        const textInputProps = {
                            multiline: true,
                            onSubmit: handleSubmit,
                            onChange: handleInputChange,
                            value: input,
                            onHistoryUp: handleHistoryUp,
                            onHistoryDown: handleHistoryDown,
                            onHistoryReset: () => resetHistory(),
                            placeholder: mode === "memory" ? 
                                'Add to memory. Try "Always use descriptive variable names"' :
                                queuedCommands.length > 0 && (getSettings().queuedCommandUpHintCount || 0) < MAX_TASK_HINTS ?
                                "Press up to edit queued messages" :
                                isFirstTimeUser ? placeholderText : undefined,
                            onExit,
                            onExitMessage: (show, key) => setExitMessage({ show, key }),
                            onMessage: (show, text) => {
                                if (show && text) {
                                    addNotification({ text }, { timeoutMs: 3600000 });
                                } else {
                                    addNotification({ text: "" }, { timeoutMs: 0 });
                                }
                            },
                            onImagePaste: handleImagePaste,
                            columns: maxInputWidth,
                            disableCursorMovementForUpDownKeys: suggestions.length > 0,
                            cursorOffset,
                            onChangeCursorOffset: setCursorOffset,
                            onPaste: handleTextPaste,
                            onIsPastingChange: setIsPasting,
                            focus: mode !== "memorySelect",
                            showCursor: mode !== "memorySelect",
                            argumentHint: commandArgumentHint,
                            onUndo: canUndo ? () => {
                                const undoState = undo();
                                if (undoState) {
                                    onInputChange(undoState.text);
                                    setCursorOffset(undoState.cursorOffset);
                                    setPastedContents(undoState.pastedContents);
                                }
                            } : undefined
                        };
                        
                        return isVimModeEnabled() ? (
                            <VimTextInput
                                {...textInputProps}
                                initialMode={vimMode}
                                onModeChange={setVimMode}
                                isLoading={isLoading}
                            />
                        ) : (
                            <TextInput {...textInputProps} />
                        );
                    })()}
                </Box>
            </Box>
            
            {/* Memory selection dialog */}
            {mode === "memorySelect" && (
                <MemorySelector
                    onSelect={(selection) => {
                        handleSubmit(input, false, selection);
                    }}
                    onCancel={() => {
                        onModeChange("memory");
                    }}
                />
            )}
            
            {/* Status bar */}
            <StatusBar
                apiKeyStatus={apiKeyStatus}
                debug={debug}
                exitMessage={exitMessage}
                vimMode={vimMode}
                mode={mode}
                autoUpdaterResult={autoUpdaterResult}
                isAutoUpdating={isAutoUpdating}
                verbose={verbose}
                tokenUsage={tokenUsage}
                onAutoUpdaterResult={onAutoUpdaterResult}
                onChangeIsUpdating={setIsAutoUpdating}
                suggestions={suggestions}
                selectedSuggestion={selectedSuggestion}
                notification={notification}
                toolPermissionContext={toolPermissionContext}
                helpOpen={isHelpOpen}
                suppressHint={input.length > 0}
                shellsSelected={shellsSelected}
                ideSelection={ideSelection}
                mcpClients={mcpClients}
                ideInstallationStatus={ideInstallationStatus}
                isPasting={isPasting}
                isInputWrapped={isInputWrapped}
                messages={messages}
            />
        </Box>
    );
}

// ===================================
// TEXT INPUT COMPONENT (y8)
// ===================================
// Core text input handling with terminal integration
function TextInput(props) {
    const [theme] = useTheme();
    const { isFocused, filterFocusSequences } = useTerminalFocus();
    
    const inputState = useTextInputState({
        value: props.value,
        onChange: props.onChange,
        onSubmit: props.onSubmit,
        onExit: props.onExit,
        onExitMessage: props.onExitMessage,
        onMessage: props.onMessage,
        onHistoryReset: props.onHistoryReset,
        onHistoryUp: props.onHistoryUp,
        onHistoryDown: props.onHistoryDown,
        focus: props.focus,
        mask: props.mask,
        multiline: props.multiline,
        cursorChar: props.showCursor ? " " : "",
        highlightPastedText: props.highlightPastedText,
        invert: isFocused ? chalk.inverse : (text) => text,
        themeText: getThemeColor("text", theme),
        columns: props.columns,
        onImagePaste: props.onImagePaste,
        disableCursorMovementForUpDownKeys: props.disableCursorMovementForUpDownKeys,
        externalOffset: props.cursorOffset,
        onOffsetChange: props.onChangeCursorOffset,
        inputFilter: filterFocusSequences
    });
    
    return (
        <TextInputRenderer
            inputState={inputState}
            terminalFocus={isFocused}
            {...props}
        />
    );
}

// ===================================
// APP STATE PROVIDER (F7)
// ===================================
// Global state management for the application
function AppStateProvider({
    children,
    initialState,
    onChangeAppState
}) {
    if (useContext(AppStateContext)) {
        throw new Error("AppStateProvider can not be nested within another AppStateProvider");
    }
    
    const [state, setState] = useState({
        currentState: initialState ?? createInitialAppState(),
        previousState: null
    });
    
    const updateState = useCallback((updater) => setState(({ currentState }) => ({
        currentState: updater(currentState),
        previousState: currentState
    })), []);
    
    const contextValue = useMemo(() => {
        const value = [state.currentState, updateState];
        value.__IS_INITIALIZED__ = true;
        return value;
    }, [state.currentState, updateState]);
    
    useEffect(() => {
        onChangeAppState?.({
            newState: state.currentState,
            oldState: state.previousState
        });
    }, [onChangeAppState, state]);
    
    // Permission context updates
    usePermissionContextUpdates(useCallback(() => {
        const permissions = getWorkspacePermissions();
        updateState((currentState) => {
            return {
                ...currentState,
                toolPermissionContext: updatePermissionContext(currentState.toolPermissionContext, permissions)
            };
        });
    }, [updateState]));
    
    return (
        <AppStateContext.Provider value={true}>
            <AppStateValueContext.Provider value={contextValue}>
                {children}
            </AppStateValueContext.Provider>
        </AppStateContext.Provider>
    );
}

// Hook to access app state
function useAppState() {
    const context = useContext(AppStateValueContext);
    if (!context.__IS_INITIALIZED__) {
        throw new ReferenceError("useAppState cannot be called outside of an <AppStateProvider />");
    }
    return context;
}

// ===================================
// HELPER FUNCTIONS
// ===================================

function createInitialAppState() {
    return {
        verbose: false,
        mainLoopModel: null,
        maxRateLimitFallbackActive: false,
        statusLineText: undefined,
        todoFeatureEnabled: false,
        toolPermissionContext: createDefaultPermissionContext(),
        checkpointing: {
            status: "uninitialized",
            saving: false,
            checkpoints: {},
            shadowRepoPath: undefined,
            autocheckpointEnabled: false
        },
        mcp: {
            clients: [],
            tools: [],
            commands: [],
            resources: {}
        },
        plugins: {
            enabled: [],
            disabled: [],
            commands: [],
            agents: []
        }
    };
}

function createDefaultPermissionContext() {
    return {
        mode: "default",
        additionalWorkingDirectories: new Map(),
        alwaysAllowRules: {},
        alwaysDenyRules: {},
        alwaysAskRules: {},
        isBypassPermissionsModeAvailable: false
    };
}

// Export the main components
export {
    InteractiveApp,
    InputInterface,
    TextInput,
    AppStateProvider,
    useAppState
};