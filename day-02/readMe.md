## What Is the File System?
- The file system is the part of the operating system that organizes and manages files and folders on storage devices.
- Windows, Linux, and macOS all have file systems (their internal implementations differ, but the concept is the same).

## What Is the fs Module?
- The File System (fs) module is a built-in Node.js module that provides functions to interact with files and directories.

## Where Is the File Actually Read?
-  The fs module is an interface.
-  The actual reading is performed by the operating system, because only the operating system can access the storage device directly.

- The fs module is Node.js's built-in interface for working with the operating system's file system.

- Node.js itself doesn't read disks directly, it delegates the work to the operating system through its internal infrastructure (including libuv).

- There are two major styles of file operations:

    - Synchronous (*Sync): simpler but blocks execution.

    - Asynchronous: non-blocking and better suited for backend servers.

- Reading brings data from disk into memory.

- Writing sends data from memory to disk.

