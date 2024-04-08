/** 
 *  interface ICommandFinishedEmitter
  * The ICommandFinishedEmitter interface defines a contract for objects that want to emit events 
 * when a command finishes executing. This allows other code to subscribe to be notified when 
 * certain events occur without having to know the implementation details.
 * 
 * This interface has two key methods:
 * 
 * emit(listenerText: string, objectToEmit: unknown): void
 * - Emits a named event that listeners can subscribe to. The listenerText indicates which listener to notify.
 *   objectToEmit is the data that will be passed to the subscribed listeners.
 *   
 * on(queryResultProcessorText: string, objectToEmit: unknown): void
 * - Allows listeners to subscribe to the "emit" events by passing a callback function. 
 *   queryResultProcessorText indicates which event they want to subscribe to.
 *   
 * Any class implementing ICommandFinishedEmitter gains the ability to emit events that others can subscribe
 * to when commands complete. This is a common pattern to loosen coupling between components in an application.
 */
interface ICommandFinishedEmitter {
    emit ( listenerText: string, objectToEmit: unknown ): void;
    on ( queryResultProcessorText: string, objectToEmit: unknown ): void;
}

export default ICommandFinishedEmitter;
